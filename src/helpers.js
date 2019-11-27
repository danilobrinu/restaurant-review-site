export const range = (start, end) => Array.from({ length: end - start }, (_, k) => k + start);

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

export const getNearbyPlaces = async (service, location) =>
  new Promise((resolve, reject) => {
    service.nearbySearch(
      { location, radius: 500, type: ['restaurant'] },
      (places, status) => {
        switch (status) {
          case window.google.maps.places.PlacesServiceStatus.OK:
            resolve(places);
            break;
          default:
            resolve([]);
            break;
        }
      },
      () => reject()
    );
  });

export const getPlaceDetails = async (service, placeId) =>
  new Promise((resolve, reject) => {
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
          'photo',
          'formatted_phone_number',
          'url',
          'rating',
        ],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject();
        }
      }
    );
  });

export const normalizePlaces = places =>
  places.reduce(
    (
      accumulator,
      {
        place_id = '',
        name = '',
        photos = [{ getUrl: () => null }],
        types = [],
        rating = 0,
        user_ratings_total = 0,
        geometry: { location },
        icon = '',
      }
    ) => {
      accumulator[place_id] = {
        id: place_id,
        cover: photos[0].getUrl(),
        tags: types.slice(-8).map(type => type.replace(/_/g, ' ')),
        rating: rating.toFixed(1),
        reviews: Array(user_ratings_total),
        name,
        location,
        icon,
      };

      return accumulator;
    },
    {}
  );

export const getFilteredPlaces = (places, query, minRating, maxRating) =>
  Object.values(places).filter(
    ({ name, rating }) =>
      name.toLowerCase().includes(query.toLowerCase()) && rating >= minRating && rating <= maxRating
  );
