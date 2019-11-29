import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

////////////////////////////////////////////////////////////////////////////////////////////////////

import {
  getCurrentPosition,
  getNearbyPlaces,
  getPlaceDetails,
  getFilteredPlaces,
  noop,
  range,
} from './helpers';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Place from './components/Place';
import Divider from './components/Divider';
import Review from './components/Review';
import Venue from './components/Venue';

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
      .then(result => setPlaces(result))
      .catch(noop);
  }, [service, centerPosition]);

  React.useEffect(() => {
    if (!service || !place) return;

    getPlaceDetails(service, place.id)
      .then(result => {
        window.cache.places[place.id] = result;

        console.log(result);

        setPlace(result);
      })
      .catch(noop);
  }, [service, place]);

  const filteredPlaces = React.useMemo(
    () => getFilteredPlaces(places, query, minRating, maxRating),
    [places, query, minRating, maxRating]
  );

  return (
    <div className="absolute inset-0">
      <div className="flex relative w-full h-full overflow-hidden">
        <div className="flex-initial relative w-full max-w-xl h-full shadow-xl z-30">
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
                    {filteredPlaces.map(restaurant => (
                      <Place
                        key={restaurant.id}
                        id={restaurant.id}
                        name={restaurant.name}
                        cover={restaurant.cover}
                        types={restaurant.types}
                        reviews={restaurant.reviews}
                        rating={restaurant.rating}
                        ratings={restaurant.ratings}
                        location={restaurant.location}
                        onClick={() => setPlace(restaurant)}
                      />
                    ))}
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>

        {place && (
          <div className="absolute left-xl w-full max-w-xl h-screen bg-white z-10">
            <div className="relative w-full h-full max-h-full overflow-x-hidden overflow-y-scroll">
              <header>
                <nav className="flex items-center absolute top-0 right-0 p-6">
                  <div
                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer select-none"
                    role="button"
                    tabIndex="0"
                    onClick={() => setPlace(null)}
                  >
                    <Icon icon="times" />
                  </div>
                </nav>

                <div className="mb-8">
                  <img className="w-full h-64 object-cover" alt="cover" src={place.cover} />
                </div>
                <div className="px-6">
                  <div className="m-0">
                    <span className="text-xs uppercase font-bold text-gray-600">Restaurant</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-4xl font-bold leading-none my-2">{place.name}</div>
                    <div>
                      <span className="text-sm">{place.ratings} ratings</span>
                    </div>
                  </div>
                </div>
              </header>

              <main>
                <Divider className="mx-6" />

                <section>
                  <div className="mx-6">
                    <Venue
                      name={place.name}
                      address={place.address}
                      phoneNumber={place.phoneNumber}
                      types={place.types}
                      gmap={place.gmap}
                      website={place.website}
                      isOpenNow={place.isOpen()}
                    />
                  </div>
                </section>

                <Divider className="mx-6" />

                <section>
                  <div className="mx-6">
                    <header className="mb-6">
                      <span className="text-2xl font-bold">Reviews</span>
                    </header>

                    {place.reviews.length > 0 ? (
                      <>
                        {place.reviews.map((review, index) => (
                          <Review
                            key={`review-${index}`}
                            photo={review.profile_photo_url}
                            author={review.author_name}
                            date={review.relative_time_description}
                            comment={review.text}
                          />
                        ))}
                      </>
                    ) : (
                      <div className="">Without reviews yet</div>
                    )}
                  </div>
                </section>
              </main>
            </div>
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
