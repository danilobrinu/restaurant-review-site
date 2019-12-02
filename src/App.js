import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

////////////////////////////////////////////////////////////////////////////////////////////////////

import {
  getCurrentPosition,
  getNearbyPlaces,
  getPlaceDetails,
  getFilteredPlaces,
  getSortedPlaces,
  noop,
  range,
} from './helpers';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Place from './components/Place';
import Divider from './components/Divider';
import Review from './components/Review';
import Venue from './components/Venue';
import Scrollable from './components/Scrollable';
import AddRestaurantForm from './components/AddRestaurantForm';
import AddReviewForm from './components/AddReviewForm';

////////////////////////////////////////////////////////////////////////////////////////////////////

window.places = {};
window.markers = {};

function App() {
  const [query, setQuery] = React.useState('');
  const [centerPosition, setCenterPosition] = React.useState(new window.google.maps.LatLng(0, 0));
  const [userPosition, setUserPosition] = React.useState(null);
  const [places, setPlaces] = React.useState({});
  const [place, setPlace] = React.useState(null);
  const [map, setMap] = React.useState(null);
  const [service, setService] = React.useState(null);
  const [minRating, setMinRating] = React.useState(0);
  const [maxRating, setMaxRating] = React.useState(5);
  const [showAddReview, setShowAddReview] = React.useState(false);
  const [showAddRestaurant, setShowAddRestaurant] = React.useState(false);
  const [locationClicked, setLocationClicked] = React.useState({ lat: 0, lng: 0 });

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
      setLocationClicked(e.latLng.toJSON());
      setShowAddRestaurant(true);
    });

    gMap.addListener('dragend', () => setCenterPosition(gMap.getCenter()));

    setMap(gMap);
    setService(gService);
  }, []);

  React.useEffect(() => {
    getCurrentPosition()
      .then(position => setUserPosition(position))
      .catch(noop);
  }, []);

  React.useEffect(() => {
    if (!place) return;

    setShowAddReview(false);
  }, [place]);

  React.useEffect(() => {
    if (!map || !userPosition) return;

    new window.google.maps.Marker({
      map,
      position: userPosition,
      icon: {
        url: 'images/marker.png',
        scaledSize: { width: 32, height: 48 },
        labelOrigin: { x: 16, y: 18 },
      },
      label: '😊',
    });

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
    if (!place) return;

    if (!Object.prototype.hasOwnProperty.call(places, place.id)) {
      setPlace(null);
    }
  }, [places, place]);

  React.useEffect(() => {
    if (!map) return;

    Object.values(window.markers).forEach(marker => marker.setMap(null));

    const markers = Object.values(places).reduce((accumulator, place) => {
      const { location: position, rating } = place;
      const marker = new window.google.maps.Marker({
        map,
        position,
        icon: {
          url: 'images/marker.png',
          scaledSize: { width: 32, height: 48 },
          labelOrigin: { x: 16, y: 18 },
        },
        label: {
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: '600',
          fontSize: '12px',
          color: '#fff',
          text: rating > 0 ? rating.toString() : 'N',
        },
      });

      marker.addListener('click', () => setPlace(place));

      accumulator[place.id] = marker;

      return accumulator;
    }, {});

    window.markers = markers;
  }, [map, places]);

  React.useEffect(() => {
    if (!service || !place) return;

    getPlaceDetails(service, place.id)
      .then(result => {
        window.places[place.id] = result;

        setPlace(result);
      })
      .catch(noop);
  }, [service, place]);

  const filteredPlaces = React.useMemo(
    () => getSortedPlaces(getFilteredPlaces(places, query, minRating, maxRating)),
    [places, query, minRating, maxRating]
  );

  const addNewRestaurant = data => {
    window.places[data.id] = data;

    setPlaces(state => ({ ...state, [data.id]: window.places[data.id] }));
    setShowAddRestaurant(false);
  };

  const addNewReview = (data, place) => {
    const reviews = [data, ...place.reviews];
    const rating = +((place.rating + data.rating) / 2).toFixed(1);
    const ratings = place.ratings + 1;

    window.places[place.id] = {
      ...place,
      rating,
      ratings,
      reviews,
    };
    window.markers[place.id].setLabel(rating.toString());

    setPlace(window.places[place.id]);
    setPlaces(state => ({ ...state, [place.id]: window.places[place.id] }));
    setShowAddReview(false);
  };

  return (
    <div className="absolute inset-0">
      <div className="flex relative w-full h-full overflow-hidden">
        <div className="flex-initial relative w-full max-w-xl h-full shadow-xl z-50">
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
                            <Icon className="text-gray-900" icon="search" />
                          </div>
                          <input
                            id="query"
                            className="flex-auto h-10 font-bold text-gray-900 placeholder-gray-600 rounded"
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
                              <Icon className="text-gray-900" icon="times" />
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                    <div className="flex mt-3">
                      <div className="flex-1">
                        <select
                          className="w-full h-12 px-4 font-bold text-gray-900 bg-gray-200 shadow-inner appearance-none rounded"
                          value={minRating}
                          onChange={e => setMinRating(+e.target.value)}
                        >
                          <option key="min-rating-option-0" value="0">
                            New
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
                          className="w-full h-12 px-4 font-bold text-gray-900 bg-gray-200 shadow-inner appearance-none rounded"
                          value={maxRating}
                          onChange={e => setMaxRating(+e.target.value)}
                        >
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
                    {filteredPlaces.length > 0 ? (
                      <>
                        {filteredPlaces.map(restaurant => (
                          <Place
                            key={restaurant.id}
                            id={restaurant.id}
                            name={restaurant.name}
                            cover={restaurant.cover}
                            types={restaurant.types}
                            rating={restaurant.rating}
                            ratings={restaurant.ratings}
                            onClick={() => setPlace(restaurant)}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center mb-6">
                          <Icon className="text-purple-400" icon="sad-tear" size="5x" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 text-center">
                          No Results!
                        </div>
                        <div className="text-gray-700 text-center">
                          Sorry there are no results for this search. Please try again.
                        </div>
                      </>
                    )}
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>

        {place && (
          <div className="absolute left-xl w-full max-w-xl h-screen bg-white z-10">
            <Scrollable key={place.id}>
              <header>
                <nav className="flex items-center absolute top-0 right-0 p-6">
                  <div
                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer select-none"
                    role="button"
                    tabIndex="0"
                    onClick={() => setPlace(null)}
                  >
                    <Icon className="text-gray-900" icon="times" />
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
                    <div className="text-4xl font-bold leading-none text-gray-900 my-2">
                      {place.name}
                    </div>
                    <div>
                      <span className="text-sm">{place.ratings} ratings</span>
                    </div>
                  </div>
                </div>
              </header>

              <main className="mb-6">
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
                            avatar={review.avatar}
                            author={review.author}
                            date={review.date.toUTCString()}
                            comment={review.comment}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-center">No Reviews, yet.</div>
                        <div className="text-center">
                          No reviews yet in this restaurant! Start adding a new review.
                        </div>
                      </>
                    )}
                  </div>
                </section>

                <section>
                  <div className="mx-6">
                    <button
                      className="w-full py-4 text-sm font-semibold leading-none text-white uppercase tracking-wider bg-indigo-600 rounded-lg"
                      onClick={() => setShowAddReview(true)}
                    >
                      Add Review
                    </button>
                  </div>
                </section>
              </main>
            </Scrollable>
          </div>
        )}

        {showAddReview && (
          <div className="absolute left-xl w-full max-w-xl h-screen z-20">
            <div className="absolute inset-0 bg-black opacity-50 -z-1" />

            <div className="p-6">
              <AddReviewForm
                handleSubmit={(_, review) => addNewReview(review, place)}
                handleCancel={() => setShowAddReview(false)}
              />
            </div>
          </div>
        )}

        {showAddRestaurant && (
          <div className="absolute left-xl w-full max-w-xl h-screen z-20">
            <div className="absolute inset-0 bg-black opacity-50 -z-1" />
            <div className="p-6">
              <AddRestaurantForm
                handleSubmit={(_, restaurant) => addNewRestaurant(restaurant)}
                handleCancel={() => setShowAddRestaurant(false)}
                location={locationClicked}
              />
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
