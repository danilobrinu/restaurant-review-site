window.google = {
  maps: {
    LatLng: jest.fn().mockImplementation((lat, lng) => ({ lat, lng })),
    places: {
      PlacesServiceStatus: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        NOT_FOUND: 'NOT_FOUND',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: '',
      },
    },
  },
};

window.navigator.geolocation = {
  getCurrentPosition: jest
    .fn()
    .mockImplementation(success => success({ coords: { latitude: 0, longitude: 0 } })),
};
