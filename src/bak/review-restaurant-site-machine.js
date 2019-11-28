import { Machine, assign } from 'xstate';
import { getCurrentPosition, getPlaceDetails, nearbyPlacesSearch } from './helpers';

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
