import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

////////////////////////////////////////////////////////////////////////////////////////////////////

import {
  getCurrentPosition,
  getNearbyPlaces,
  normalizePlaces,
  getFilteredPlaces,
  range,
} from './helpers';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Place from './components/Place';

////////////////////////////////////////////////////////////////////////////////////////////////////

library.add(fas);

window.cache = { places: {} };

function App() {
  const [query, setQuery] = React.useState('');
  const [centerPosition, setCenterPosition] = React.useState(new window.google.maps.LatLng(0, 0));
  const [userPosition, setUserPosition] = React.useState(null);
  const [places, setPlaces] = React.useState({});
  const [place, setPlace] = React.useState(null);
  const [map, setMap] = React.useState(null);
  const [service, setService] = React.useState(null);
  const [minRating, setMinRating] = React.useState(1);
  const [maxRating, setMaxRating] = React.useState(5);
  const mapRef = React.useRef();

  React.useEffect(() => {
    const gMap = new window.google.maps.Map(mapRef.current, {
      center: new window.google.maps.LatLng(0, 0),
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      gestureHandling: 'cooperative',
    });
    const gService = new window.google.maps.places.PlacesService(gMap);

    gMap.addListener('click', e => {
      console.log('click', e, gMap);
    });

    gMap.addListener('dragend', () => setCenterPosition(gMap.getCenter()));

    setMap(gMap);
    setService(gService);
  }, []);

  React.useEffect(() => {
    let getUserPosition = async () => {
      const position = await getCurrentPosition();

      setUserPosition(position);
    };

    getUserPosition();
  }, []);

  React.useEffect(() => {
    if (!map || !userPosition) return;

    new window.google.maps.Marker({
      map,
      position: userPosition,
      icon: {
        url: 'images/marker.png',
        scaledSize: {
          width: 32,
          height: 48,
        },
        labelOrigin: {
          x: 16,
          y: 18,
        },
      },
      label: '😊',
    });

    map.setCenter(userPosition);

    setCenterPosition(userPosition);
  }, [map, userPosition]);

  React.useEffect(() => {
    if (!map) return;

    map.setCenter(centerPosition);
  }, [map, centerPosition]);

  React.useEffect(() => {
    if (!service) return;

    getNearbyPlaces(service, centerPosition)
      .then(result => {
        const restaurants = normalizePlaces(result);

        window.cache.places = { ...window.cache.places, ...restaurants };

        setPlaces(restaurants);
      })
      .catch(() => {});
  }, [service, centerPosition]);

  const filteredPlaces = React.useMemo(
    () => getFilteredPlaces(places, query, minRating, maxRating),
    [places, query, minRating, maxRating]
  );

  return (
    <div className="absolute inset-0">
      <div className="flex relative w-full h-full overflow-hidden">
        <div className="flex-initial relative w-full max-w-xl h-full shadow-xl">
          {/* <div className="relative w-full h-full max-h-full overflow-x-hidden overflow-y-scroll"> */}
          <div className="flex flex-col w-full h-full">
            <header className="flex-none">
              <nav className="flex py-4 border-b">
                <div className="w-full px-6">
                  <form>
                    <div className="flex items-center h-12 shadow-md rounded">
                      <label className="w-full" htmlFor="query">
                        <div className="flex">
                          <div
                            className="flex flex-initial w-10 h-10 items-center justify-center cursor-pointer"
                            role="button"
                            tabIndex="0"
                          >
                            <Icon icon="search" />
                          </div>
                          <input
                            id="query"
                            className="flex-auto h-10 placeholder-gray-600 font-bold rounded"
                            name="query"
                            value={query}
                            placeholder="Search a Restaurant"
                            onChange={e => setQuery(e.target.value)}
                          />
                          {query.length > 0 && (
                            <div
                              className="flex flex-initial w-10 h-10 items-center justify-center cursor-pointer"
                              tabIndex="0"
                              role="button"
                              onKeyDown={e => {
                                if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
                                  e.preventDefault();
                                  setQuery('');
                                }
                              }}
                              onClick={() => setQuery('')}
                            >
                              <Icon icon="times" />
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                    <div className="flex mt-3">
                      <div className="flex-1">
                        <select
                          className="w-full h-12 px-4 font-bold bg-gray-200 shadow-inner appearance-none rounded"
                          value={minRating}
                          onChange={e => setMinRating(+e.target.value)}
                        >
                          <option value="0" disabled>
                            Min
                          </option>
                          {range(1, 5).map(option => (
                            <option key={`min-rating-option-${option}`} value={option}>
                              {option} (Star{option > 1 ? 's' : ''})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center justify-center w-12">
                        <span className="font-bold">⯈</span>
                      </div>
                      <div className="flex-1">
                        <select
                          className="w-full h-12 px-4 font-bold bg-gray-200 shadow-inner appearance-none rounded"
                          value={maxRating}
                          onChange={e => setMaxRating(+e.target.value)}
                        >
                          <option value="6" disabled>
                            Max
                          </option>
                          {range(minRating + 1, 6).map(option => (
                            <option key={`max-rating-option-${option}`} value={option}>
                              {option} (Star{option > 1 ? 's' : ''})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </nav>
            </header>
            <div className="flex-1 relative max-h-full">
              <div className="absolute inset-0">
                <div className="relative w-full h-full max-h-full overflow-x-hidden overflow-y-scroll">
                  <main className="p-6">
                    {filteredPlaces.map(item => (
                      <Place
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        cover={item.cover}
                        tags={item.tags}
                        reviews={item.reviews}
                        rating={item.rating}
                        location={item.location}
                        onClick={() => setPlace(item)}
                      />
                    ))}
                  </main>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>

        {place && (
          <div
            className="absolute max-w-xl h-screen bg-white"
            style={{ left: '36rem', zIndex: 999 }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full cursor-pointer select-none"
              role="button"
              tabIndex="0"
              onClick={() => setPlace(null)}
            >
              <Icon icon="times" />
            </div>
            {JSON.stringify(place)}
          </div>
        )}

        <div className="flex-auto relative">
          <div ref={mapRef} className="absolute inset-0" />
        </div>
      </div>
    </div>
  );
}

export default App;
