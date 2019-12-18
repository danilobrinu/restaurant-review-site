window.google = {
  maps: {
    LatLng: jest.fn().mockImplementation((lat, lng) => ({ lat, lng })),
    places: {
      PlacesServiceStatus: {
        OK: 'OK',
      },
    },
  },
};

window.navigator.geolocation = {
  getCurrentPosition: jest
    .fn()
    .mockImplementation(success => success({ coords: { latitude: 0, longitude: 0 } })),
};
