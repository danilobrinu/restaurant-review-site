/**
 * range
 * @param {Number} start
 * @param {Number} end
 * @return {Number[]}
 */
export const range = (start, end) =>
  Array.from(
    { length: Number.parseInt(end, 10) - Number.parseInt(start) },
    (_, k) => k + Number.parseInt(start)
  );

/**
 * getDataURI
 * @param {File} file
 * @param {?Number} maxFileSize the max file size in mb by default is 2.
 */
export const getDataURI = async (file, maxFileSize = 2) =>
  new Promise((resolve, reject) => {
    const sizeInMb = (file.size / 1e6).toFixed(3);

    if (sizeInMb < maxFileSize) {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject();
      reader.onabort = () => reject();

      reader.readAsDataURL(file);
    } else {
      window.alert(
        `Your file has ${sizeInMb}mb. The max is ${maxFileSize}mb. Please try again with another file.`
      );

      reject();
    }
  });

/**
 * getCurrentPosition
 * @return {Promise}
 */
export const getCurrentPosition = async () =>
  new Promise((resolve, reject) => {
    if ('geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          resolve(new window.google.maps.LatLng(latitude, longitude));
        },
        () => reject(),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      reject();
    }
  });

/**
 * getNearbyPlaces
 * @param {google.maps.places.PlacesService} service instance of PlacesService (https://developers.google.com/maps/documentation/javascript/reference/places-service)
 * @param {google.maps.LatLng} location instance of LatLng (https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng)
 * @return {Promise}
 */
export const getNearbyPlaces = async (service, location) =>
  new Promise((resolve, reject) => {
    service.nearbySearch(
      { location, radius: 500, type: ['restaurant'] },
      (places, status) => {
        switch (status) {
          case window.google.maps.places.PlacesServiceStatus.OK:
            resolve(normalizePlaces(places));
            break;
          default:
            resolve({});
            break;
        }
      },
      () => reject()
    );
  });

/**
 * getPlaceDetails
 * @param {google.maps.places.PlacesService} service instance of PlacesService (https://developers.google.com/maps/documentation/javascript/reference/places-service)
 * @param {String} placeId
 * @return {Promise}
 */
export const getPlaceDetails = async (service, placeId) =>
  new Promise((resolve, reject) => {
    if (Object.prototype.hasOwnProperty.call(window.places, placeId)) {
      resolve(window.places[placeId]);
    } else {
      service.getDetails(
        {
          placeId,
          fields: [
            'place_id',
            'name',
            'type',
            'reviews',
            'user_ratings_total',
            'formatted_address',
            'photos',
            'international_phone_number',
            'url',
            'rating',
            'geometry',
            'vicinity',
            'website',
          ],
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            window.places[placeId] = normalizePlace(place);

            resolve(window.places[placeId]);
          } else {
            reject();
          }
        }
      );
    }
  });

/**
 * normalizePlace
 * @param {Object} RawPlaceObject
 * @return {Object}
 */
export const normalizePlace = ({
  place_id = '',
  name = '',
  photos = [{ getUrl: () => null }],
  types = [],
  rating = 0,
  user_ratings_total = 0,
  geometry: { location },
  international_phone_number = '',
  opening_hours: { isOpen = () => true } = {},
  website = '',
  vicinity = '',
  formatted_address = '',
  reviews = [],
  url = '',
}) => ({
  id: place_id,
  cover: photos[0].getUrl({ maxWidth: 570, maxHeight: 260 }),
  types: types.slice(-8).map(type => type.replace(/_/g, ' ')),
  phoneNumber: international_phone_number,
  gmap: url,
  address: formatted_address || vicinity,
  ratings: user_ratings_total,
  reviews: getSortedReviews(normalizeReviews(reviews)),
  rating,
  isOpen,
  website,
  name,
  location,
});

/**
 * normalizePlaces
 * @param {Object[]} places
 * @return {Object<string, Object>}
 */
export const normalizePlaces = places =>
  places.reduce((accumulator, place) => {
    accumulator[place.place_id] = normalizePlace(place);

    return accumulator;
  }, {});

/**
 * normalizeReview
 * @param {Object} RawReviewObject
 * @return {Object}
 */
export const normalizeReview = ({
  profile_photo_url: avatar,
  author_name: author,
  text: comment,
  time,
}) => ({
  date: new Date(time * 1000),
  avatar,
  author,
  comment,
});

/**
 * normalizeReviews
 * @param {Object[]} reviews
 * @return {Object[]}
 */
export const normalizeReviews = reviews => reviews.map(review => normalizeReview(review));

/**
 * getSortedReviews
 * @param {Object[]} reviews
 * @return {Object[]}
 */
export const getSortedReviews = reviews =>
  [...reviews].sort((left, right) => right.date.getTime() - left.date.getTime());

/**
 * getFilteredPlaces
 * @param {Object<string, Object>} places
 * @param {String} query
 * @param {Number} minRating
 * @param {Number} maxRating
 * @return {Object[]}
 */
export const getFilteredPlaces = (places, query, minRating, maxRating) =>
  Object.values(places).filter(
    ({ name, rating }) =>
      name.toLowerCase().includes(query.toLowerCase()) && rating >= minRating && rating <= maxRating
  );

/**
 * getSortedPlaces
 * @param {Object[]} places
 * @return {Object[]}
 */
export const getSortedPlaces = places =>
  [...places].sort((left, right) => right.rating - left.rating);

export const noop = () => {};

/**
 * gmapEncodeURI
 * @param {String} uri
 * @return {String}
 */
export const gmapEncodeURI = uri => (uri ? window.encodeURIComponent(uri) : '');

/**
 * uniqid
 * @return {String} return a random string
 */
export const uniqid = () => (new Date().getTime() * Math.random()).toString(32).replace('.', '');

/**
 * cleanMarkers
 */
export const cleanMarkers = () =>
  Object.values(window.markers).forEach(marker => marker.setMap(null));

export const debounce = (func, delay = 150) => {
  let timer;

  const debounced = (...args) => {
    window.clearTimeout(timer);

    timer = window.setTimeout(() => func(...args), delay);
  };

  return debounced;
};
