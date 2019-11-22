import { Machine, assign } from 'xstate';

const getCurrentPosition = async () =>
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

const nearbyPlacesSearch = async ({ location, gmap }) =>
  new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(gmap);

    service.nearbySearch({ location, radius: 500, type: ['restaurant'] }, (places, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(places);
      } else {
        reject();
      }
    });
  });

const getPlaceDetails = async ({ gmap, placeId }) =>
  new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(gmap);

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

export const restauranReviewSiteMachine = Machine({
  id: 'reviewRestaurant',
  initial: 'idle',
  context: {
    position: null,
    gmap: null,
  },
  states: {
    idle: {
      type: 'parallel',
      states: {
        position: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                REQUEST: 'requesting',
              },
            },
            requesting: {
              invoke: {
                src: () => getCurrentPosition(),
                onDone: {
                  target: 'granted',
                  actions: assign({ position: (_, { data }) => data }),
                },
                onError: 'denied',
              },
              on: {
                CANCEL: 'idle',
              },
            },
            granted: {},
            denied: {
              on: {
                REQUEST: 'requesting',
              },
            },
          },
        },
        map: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                CREATE: 'creating',
              },
            },
            creating: {
              on: {
                CANCEL: 'idle',
                CREATED: {
                  target: 'created',
                  actions: assign({ gmap: (_, { data }) => data }),
                },
              },
            },
            created: {},
          },
        },
      },
      on: {
        NEXT: 'places',
      },
    },
    places: {
      initial: 'idle',
      states: {
        idle: {
          SEARCH: 'searching',
        },
        searching: {
          invoke: {
            src: ({ location, gmap }) => nearbyPlacesSearch({ location, gmap }),
            onDone: {
              target: 'success',
              actions: assign({ places: (_, { data }) => data }),
            },
            onError: 'failure',
          },
        },
        success: {},
        failure: {
          on: {
            SEARCH: 'searching',
          },
        },
      },
      on: {
        SELECT: 'place',
      },
    },
    place: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            FETCH: 'fetching',
          },
        },
        fetching: {
          invoke: {
            src: ({ map }, { placeId }) => getPlaceDetails({ map, placeId }),
            onDone: {
              target: 'success',
              actions: assign({ place: (_, { data }) => data }),
            },
            onError: 'failure',
          },
        },
        success: {},
        failure: {
          on: {
            FETCH: 'fetching',
          },
        },
      },
      on: {
        BACK: 'places',
      },
    },
  },
});
