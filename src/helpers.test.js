import {
  getCurrentPosition,
  getDataURI,
  getSortedReviews,
  getFilteredPlaces,
  getSortedPlaces,
  getNearbyPlaces,
  getPlaceDetails,
  normalizeReviews,
  normalizePlaces,
  gmapEncodeURI,
  cleanMarkers,
  uniqid,
  debounce,
  range,
} from './helpers';

expect.extend({
  toHaveReturnedWith: (received, args, expected) => ({ pass: received(...args) === expected }),
});

describe('range', () => {
  test('Generate an array of numbers with valid parameters (Number or String)', () => {
    expect(range(1, 6)).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
    expect(range('1', '6')).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
    expect(range(-5, 0)).toEqual([-5, -4, -3, -2, -1]);
    expect(range('-5', '0')).toEqual([-5, -4, -3, -2, -1]);
  });

  test('Generate an array with wrong parameters', () => {
    expect(range()).toEqual([]);
    expect(range(2)).toEqual([]);
    expect(range(1.5)).toEqual([]);
    expect(range('a')).toEqual([]);
    expect(range(undefined, 2)).toEqual([]);
    expect(range(undefined, 1.5)).toEqual([]);
  });
});

describe('gmapEncodeURI', () => {
  test('Encode URI for Google Maps Embbed API', () => {
    const placeName = 'The Bottle';

    expect(gmapEncodeURI(placeName)).toBe('The%20Bottle');
  });

  test('Encode URI for Google Maps Embbed API without parameters', () => {
    expect(gmapEncodeURI()).toBe('');
  });

  test('Encode URI for Google Maps Embbed API with wrong parameters', () => {
    expect(gmapEncodeURI('')).toBe('');
    expect(gmapEncodeURI(null)).toBe('');
    expect(gmapEncodeURI(undefined)).toBe('');
  });
});

describe('clearMarkers', () => {
  test('Cleanup all Google Markers in the map', () => {
    const setMap = jest.fn();

    window.markers = { 0: { setMap }, 1: { setMap }, 2: { setMap } };

    cleanMarkers();

    expect(setMap).toBeCalled();
    expect(setMap).toHaveBeenCalledTimes(3);
  });
});

describe('uniqid', () => {
  test('Generate a uniqid using the same timestamp', () => {
    const spy = jest.spyOn(Date.prototype, 'getTime').mockImplementation(() => 1234567890);

    expect(uniqid()).not.toBe(uniqid());

    spy.mockRestore();
  });
});

describe('getCurrentPosition', () => {
  test('Get the current position of the user', async () => {
    await expect(getCurrentPosition()).resolves.toEqual({ lat: 0, lng: 0 });
  });
});

describe('getDataURI', () => {
  test('Generate a data URI from a file', async () => {
    const file = new File(['Hello World!'], 'foo.txt', {
      type: 'text/plain;charset=utf-8',
    });

    // bug: charset is undefined on jsdom -> https://github.com/jsdom/jsdom/issues/2269
    await expect(getDataURI(file)).resolves.toEqual(
      'data:text/plain;charset=undefined,Hello%20World!'
    );
  });
});

describe('getNearbyPlaces', () => {
  test('Get nearby places successfully', async () => {
    const service = {
      nearbySearch: jest.fn().mockImplementation((_, success) =>
        success(
          [
            {
              place_id: 'abcde',
              name: 'name',
              photos: [{ getUrl: () => 'http://avatar.com/123456' }],
              types: ['restaurant', 'point_of_interest'],
              rating: 0,
              user_ratings_total: 0,
              geometry: { location: { lat: 0, lng: 0 } },
              international_phone_number: '+51 799 9999',
              opening_hours: { isOpen: () => true },
              website: 'http://google.com',
              vicinity: 'vicinity',
              formatted_address: '',
              reviews: [],
              url: 'http://google.maps/123456789',
            },
          ],
          window.google.maps.places.PlacesServiceStatus.OK
        )
      ),
    };
    const location = { lat: 0, lng: 0 };

    await expect(getNearbyPlaces(service, location)).resolves.toEqual({
      abcde: {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'abcde',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'name',
        phoneNumber: '+51 799 9999',
        rating: 0,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
    });
  });

  test('Get nearby places unsuccessfully', async () => {
    const service = {
      nearbySearch: jest
        .fn()
        .mockImplementation((_, success) =>
          success([], window.google.maps.places.PlacesServiceStatus.OK)
        ),
    };
    const location = { lat: 0, lng: 0 };

    await expect(getNearbyPlaces(service, location)).resolves.toEqual({});
  });
});

describe('getPlaceDetails', () => {
  test('Get place details successfully', async () => {
    window.places = {};

    const service = {
      getDetails: jest.fn().mockImplementation((_, success) =>
        success(
          {
            place_id: 'abcde',
            name: 'name',
            photos: [{ getUrl: () => 'http://avatar.com/123456' }],
            types: ['restaurant', 'point_of_interest'],
            rating: 0,
            user_ratings_total: 0,
            geometry: { location: { lat: 0, lng: 0 } },
            international_phone_number: '+51 799 9999',
            opening_hours: { isOpen: () => true },
            website: 'http://google.com',
            vicinity: 'vicinity',
            formatted_address: '',
            reviews: [],
            url: 'http://google.maps/123456789',
          },
          window.google.maps.places.PlacesServiceStatus.OK
        )
      ),
    };
    const placeId = '123456789';

    await expect(getPlaceDetails(service, placeId)).resolves.toEqual({
      address: 'vicinity',
      cover: 'http://avatar.com/123456',
      gmap: 'http://google.maps/123456789',
      id: 'abcde',
      isOpen: expect.toHaveReturnedWith([], true),
      location: { lat: 0, lng: 0 },
      name: 'name',
      phoneNumber: '+51 799 9999',
      rating: 0,
      ratings: 0,
      reviews: [],
      types: ['restaurant', 'point of interest'],
      website: 'http://google.com',
    });
  });

  test('Get place details unsuccessfully', async () => {
    window.places = {};

    const placeId = '123456789';
    const notFoundService = {
      getDetails: jest
        .fn()
        .mockImplementation((_, success) =>
          success(null, window.google.maps.places.PlacesServiceStatus.NOT_FOUND)
        ),
    };

    await expect(getPlaceDetails(notFoundService, placeId)).rejects.toEqual();

    const invalidRequestService = {
      getDetails: jest
        .fn()
        .mockImplementation((_, success) =>
          success(null, window.google.maps.places.PlacesServiceStatus.INVALID_REQUEST)
        ),
    };

    await expect(getPlaceDetails(invalidRequestService, placeId)).rejects.toEqual();

    const overQueryLimitService = {
      getDetails: jest
        .fn()
        .mockImplementation((_, success) =>
          success(null, window.google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
        ),
    };

    await expect(getPlaceDetails(overQueryLimitService, placeId)).rejects.toEqual();

    const requestDeniedService = {
      getDetails: jest
        .fn()
        .mockImplementation((_, success) =>
          success(null, window.google.maps.places.PlacesServiceStatus.REQUEST_DENIED)
        ),
    };

    await expect(getPlaceDetails(requestDeniedService, placeId)).rejects.toEqual();

    const unknowErrorService = {
      getDetails: jest
        .fn()
        .mockImplementation((_, success) =>
          success(null, window.google.maps.places.PlacesServiceStatus.UNKNOW_ERROR)
        ),
    };

    await expect(getPlaceDetails(unknowErrorService, placeId)).rejects.toEqual();

    const zeroResultsService = {
      getDetails: jest
        .fn()
        .mockImplementation((_, success) =>
          success(null, window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS)
        ),
    };

    await expect(getPlaceDetails(zeroResultsService, placeId)).rejects.toEqual();
  });
});

describe('normalizePlace + normalizePlaces', () => {
  test('Normalize data from getNearbyPlaces()', () => {
    const placesToNormalize = [
      {
        place_id: 'abcde',
        name: 'name',
        photos: [{ getUrl: () => 'http://avatar.com/123456' }],
        types: ['restaurant', 'point_of_interest'],
        rating: 0,
        user_ratings_total: 0,
        geometry: { location: { lat: 0, lng: 0 } },
        international_phone_number: '+51 799 9999',
        opening_hours: { isOpen: () => true },
        website: 'http://google.com',
        vicinity: 'vicinity',
        formatted_address: '',
        reviews: [],
        url: 'http://google.maps/123456789',
      },
    ];

    expect(normalizePlaces(placesToNormalize)).toEqual({
      abcde: {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'abcde',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'name',
        phoneNumber: '+51 799 9999',
        rating: 0,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
    });
  });
});

describe('getFilteredPlaces', () => {
  const defaultQuery = '';
  const defaultRatingFilter = [0, 5];
  const places = {
    abc: {
      address: 'vicinity',
      cover: 'http://avatar.com/123456',
      gmap: 'http://google.maps/123456789',
      id: 'abc',
      isOpen: expect.toHaveReturnedWith([], true),
      location: { lat: 0, lng: 0 },
      name: 'Bar Juanito',
      phoneNumber: '+51 799 9999',
      rating: 0,
      ratings: 0,
      reviews: [],
      types: ['restaurant', 'point of interest'],
      website: 'http://google.com',
    },
    def: {
      address: 'vicinity',
      cover: 'http://avatar.com/123456',
      gmap: 'http://google.maps/123456789',
      id: 'def',
      isOpen: expect.toHaveReturnedWith([], true),
      location: { lat: 0, lng: 0 },
      name: 'Bar Supremo',
      phoneNumber: '+51 799 9999',
      rating: 4.3,
      ratings: 0,
      reviews: [],
      types: ['restaurant', 'point of interest'],
      website: 'http://google.com',
    },
    fgh: {
      address: 'vicinity',
      cover: 'http://avatar.com/123456',
      gmap: 'http://google.maps/123456789',
      id: 'fgh',
      isOpen: expect.toHaveReturnedWith([], true),
      location: { lat: 0, lng: 0 },
      name: 'El Pollo Soleado',
      phoneNumber: '+51 799 9999',
      rating: 3.8,
      ratings: 0,
      reviews: [],
      types: ['restaurant', 'point of interest'],
      website: 'http://google.com',
    },
  };

  test('Get filtered places by a given query', () => {
    const query = 'Bar';
    const [minRating, maxRating] = defaultRatingFilter;

    expect(getFilteredPlaces(places, query, minRating, maxRating)).toEqual([
      {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'abc',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'Bar Juanito',
        phoneNumber: '+51 799 9999',
        rating: 0,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
      {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'def',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'Bar Supremo',
        phoneNumber: '+51 799 9999',
        rating: 4.3,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
    ]);
  });

  describe('Get filtered places by a given range of ratings', () => {
    test('Get filtered places including the new ones', () => {
      const [minRating, maxRating] = [0, 4];

      expect(getFilteredPlaces(places, defaultQuery, minRating, maxRating)).toEqual([
        {
          address: 'vicinity',
          cover: 'http://avatar.com/123456',
          gmap: 'http://google.maps/123456789',
          id: 'abc',
          isOpen: expect.toHaveReturnedWith([], true),
          location: { lat: 0, lng: 0 },
          name: 'Bar Juanito',
          phoneNumber: '+51 799 9999',
          rating: 0,
          ratings: 0,
          reviews: [],
          types: ['restaurant', 'point of interest'],
          website: 'http://google.com',
        },
        {
          address: 'vicinity',
          cover: 'http://avatar.com/123456',
          gmap: 'http://google.maps/123456789',
          id: 'fgh',
          isOpen: expect.toHaveReturnedWith([], true),
          location: { lat: 0, lng: 0 },
          name: 'El Pollo Soleado',
          phoneNumber: '+51 799 9999',
          rating: 3.8,
          ratings: 0,
          reviews: [],
          types: ['restaurant', 'point of interest'],
          website: 'http://google.com',
        },
      ]);
    });

    test('Get filtered places excluding the new ones', () => {
      const [minRating, maxRating] = [1, 4];

      expect(getFilteredPlaces(places, defaultQuery, minRating, maxRating)).toEqual([
        {
          address: 'vicinity',
          cover: 'http://avatar.com/123456',
          gmap: 'http://google.maps/123456789',
          id: 'fgh',
          isOpen: expect.toHaveReturnedWith([], true),
          location: { lat: 0, lng: 0 },
          name: 'El Pollo Soleado',
          phoneNumber: '+51 799 9999',
          rating: 3.8,
          ratings: 0,
          reviews: [],
          types: ['restaurant', 'point of interest'],
          website: 'http://google.com',
        },
      ]);
    });

    test('Get filtered places with at least 4 stars', () => {});
  });

  test('Get filtered places by a given query and a given range of ratings', () => {
    const query = 'Bar';
    const [minRating, maxRating] = [4, 5];

    expect(getFilteredPlaces(places, query, minRating, maxRating)).toEqual([
      {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'def',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'Bar Supremo',
        phoneNumber: '+51 799 9999',
        rating: 4.3,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
    ]);
  });
});

describe('getSortedPlaces', () => {
  test('Get sorted places by rating in descending order', () => {
    const places = [
      {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'abc',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'name 1',
        phoneNumber: '+51 799 9999',
        rating: 0,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
      {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'def',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'name 2',
        phoneNumber: '+51 799 9999',
        rating: 4.5,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
      {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'fgh',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'name 3',
        phoneNumber: '+51 799 9999',
        rating: 4.2,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
    ];

    expect(getSortedPlaces(places)).toEqual([
      {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'def',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'name 2',
        phoneNumber: '+51 799 9999',
        rating: 4.5,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
      {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'fgh',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'name 3',
        phoneNumber: '+51 799 9999',
        rating: 4.2,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
      {
        address: 'vicinity',
        cover: 'http://avatar.com/123456',
        gmap: 'http://google.maps/123456789',
        id: 'abc',
        isOpen: expect.toHaveReturnedWith([], true),
        location: { lat: 0, lng: 0 },
        name: 'name 1',
        phoneNumber: '+51 799 9999',
        rating: 0,
        ratings: 0,
        reviews: [],
        types: ['restaurant', 'point of interest'],
        website: 'http://google.com',
      },
    ]);
  });
});

describe('normalizeReview + normalizeReviews', () => {
  test('Normalize data from getPlaceDetails()', () => {
    const reviewsToNormalize = [
      {
        profile_photo_url: 'avatar',
        author_name: 'author',
        text: 'comment',
        time: 1576624630,
      },
    ];

    expect(normalizeReviews(reviewsToNormalize)).toEqual([
      {
        avatar: 'avatar',
        author: 'author',
        comment: 'comment',
        date: new Date(1576624630 * 1000),
      },
    ]);
  });
});

describe('getSortedReviews', () => {
  test('Get sorted reviews by reverse chronological order', () => {
    const reviews = [
      {
        avatar: 'avatar 2',
        author: 'author 2',
        comment: 'comment 2',
        date: new Date(2019, 1, 2),
      },
      {
        avatar: 'avatar 1',
        author: 'author 1',
        comment: 'comment 1',
        date: new Date(2019, 1, 1),
      },
      {
        avatar: 'avatar 3',
        author: 'author 3',
        comment: 'comment 3',
        date: new Date(2019, 1, 3),
      },
    ];

    expect(getSortedReviews(reviews)).toEqual([
      {
        avatar: 'avatar 3',
        author: 'author 3',
        comment: 'comment 3',
        date: new Date(2019, 1, 3),
      },
      {
        avatar: 'avatar 2',
        author: 'author 2',
        comment: 'comment 2',
        date: new Date(2019, 1, 2),
      },
      {
        avatar: 'avatar 1',
        author: 'author 1',
        comment: 'comment 1',
        date: new Date(2019, 1, 1),
      },
    ]);
  });
});

describe('debounce', () => {
  test('Check the debounce function only call once time to the callback function', () => {
    jest.useFakeTimers();

    const func = jest.fn();
    const debounced = debounce(func);

    debounced();
    debounced();
    debounced();

    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(1);
  });
});
