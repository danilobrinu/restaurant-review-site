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
  getSortedPlaces,
  noop,
  range,
  uniqid,
} from './helpers';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Place from './components/Place';
import Divider from './components/Divider';
import Review from './components/Review';
import Venue from './components/Venue';
import Scrollable from './components/Scrollable';

////////////////////////////////////////////////////////////////////////////////////////////////////

library.add(fas);

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
  const [reviewAuthor, setReviewAuthor] = React.useState('');
  const [reviewComment, setReviewComment] = React.useState('');
  const [reviewRating, setReviewRating] = React.useState(1);

  const [showAddRestaurant, setShowAddRestaurant] = React.useState(false);
  const [restaurantCover, setRestaurantCover] = React.useState('');
  const [restaurantName, setRestaurantName] = React.useState('');
  const [restaurantLocationLatitude, setRestaurantLocationLatitude] = React.useState('');
  const [restaurantLocationLongitude, setRestaurantLocationLongitude] = React.useState('');
  const [restaurantPhoneNumber, setRestaurantPhoneNumber] = React.useState('');
  const [restaurantWebsite, setRestaurantWebsite] = React.useState('');
  const [restaurantAddress, setRestaurantAddress] = React.useState('');

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
      setRestaurantLocationLatitude(e.latLng.lat());
      setRestaurantLocationLongitude(e.latLng.lng());

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

  const handleSubmitRestaurant = e => {
    e.preventDefault();

    setPlace(null);

    const restaurant = {
      address: restaurantAddress,
      cover: restaurantCover,
      gmap: null,
      id: uniqid(),
      isOpen: () => true,
      location: new window.google.maps.LatLng(
        restaurantLocationLatitude,
        restaurantLocationLongitude
      ),
      name: restaurantName,
      phoneNumber: restaurantPhoneNumber,
      rating: 0,
      ratings: 0,
      reviews: [],
      types: ['restaurant'],
      website: restaurantWebsite,
    };

    window.places[restaurant.id] = restaurant;

    setPlaces(state => ({ ...state, [restaurant.id]: restaurant }));

    setShowAddRestaurant(false);
  };

  const handleSubmitReview = e => {
    e.preventDefault();

    const reviews = [
      {
        photo:
          'https://lh5.ggpht.com/-xeAcqbCc1fs/AAAAAAAAAAI/AAAAAAAAAAA/g9V9J9JSvos/s128-c0x00000000-cc-rp-mo/photo.jpg',
        date: new Date(),
        rating: reviewRating,
        author: reviewAuthor,
        comment: reviewComment,
      },
      ...place.reviews,
    ];
    const rating = +((place.rating + reviewRating) / reviews.length).toFixed(1);
    const ratings = place.ratings + 1;

    window.places[place.id] = {
      ...place,
      rating,
      ratings,
      reviews,
    };

    setPlace(window.places[place.id]);
    setPlaces(state => ({ ...state, [place.id]: window.places[place.id] }));

    window.markers[place.id].setLabel(rating.toString());

    setReviewRating(1);
    setReviewAuthor('');
    setReviewComment('');

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
                            photo={review.photo}
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
              <div className="bg-white rounded-lg overflow-hidden">
                <form onSubmit={handleSubmitReview}>
                  <div className="px-4 pt-4 pb-2 border-b">
                    <div className="text-xs leading-none">Rating</div>
                    <div className="mt-1">
                      <div className="flex justify-around py-1">
                        <label role="button" tabIndex="0" className="cursor-pointer">
                          <Icon
                            className={reviewRating === 1 ? 'text-gray-900' : 'text-gray-600'}
                            icon="angry"
                            size="3x"
                          />
                          <input
                            className="hidden"
                            type="radio"
                            name="rating"
                            value="1"
                            checked={reviewRating === 1}
                            onChange={e => setReviewRating(+e.target.value)}
                          />
                        </label>
                        <label role="button" tabIndex="0" className="cursor-pointer">
                          <Icon
                            className={reviewRating === 2 ? 'text-gray-900' : 'text-gray-600'}
                            icon="frown"
                            size="3x"
                          />
                          <input
                            className="hidden"
                            type="radio"
                            name="rating"
                            value="2"
                            checked={reviewRating === 2}
                            onChange={e => setReviewRating(+e.target.value)}
                          />
                        </label>
                        <label role="button" tabIndex="0" className="cursor-pointer">
                          <Icon
                            className={reviewRating === 3 ? 'text-gray-900' : 'text-gray-600'}
                            icon="meh"
                            size="3x"
                          />
                          <input
                            className="hidden"
                            type="radio"
                            name="rating"
                            value="3"
                            checked={reviewRating === 3}
                            onChange={e => setReviewRating(+e.target.value)}
                          />
                        </label>
                        <label role="button" tabIndex="0" className="cursor-pointer">
                          <Icon
                            className={reviewRating === 4 ? 'text-gray-900' : 'text-gray-600'}
                            icon="smile"
                            size="3x"
                          />
                          <input
                            className="hidden"
                            type="radio"
                            name="rating"
                            value="4"
                            checked={reviewRating === 4}
                            onChange={e => setReviewRating(+e.target.value)}
                          />
                        </label>
                        <label role="button" tabIndex="0" className="cursor-pointer">
                          <Icon
                            className={reviewRating === 5 ? 'text-gray-900' : 'text-gray-600'}
                            icon="laugh"
                            size="3x"
                          />
                          <input
                            className="hidden"
                            type="radio"
                            name="rating"
                            value="5"
                            checked={reviewRating === 5}
                            onChange={e => setReviewRating(+e.target.value)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pt-4 pb-2 border-b">
                    <div className="text-xs leading-none">Name</div>
                    <div className="mt-1">
                      <input
                        className="w-full py-1"
                        type="text"
                        placeholder="Enter your name"
                        value={reviewAuthor}
                        onChange={e => setReviewAuthor(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="px-4 pt-4 pb-2">
                    <div className="text-xs leading-none">Comment</div>
                    <div className="mt-1">
                      <textarea
                        className="w-full py-1"
                        type="text"
                        rows="4"
                        placeholder="Write a comment about your experience"
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-100">
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 text-sm font-semibold text-indigo-600 rounded"
                        type="button"
                        onClick={() => {
                          setReviewRating(1);
                          setReviewAuthor('');
                          setReviewComment('');
                          setShowAddReview(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-indigo-600 rounded"
                        type="submit"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {showAddRestaurant && (
          <div className="absolute left-xl w-full max-w-xl h-screen z-20">
            <div className="absolute inset-0 bg-black opacity-50 -z-1" />
            <div className="p-6">
              <div className="bg-white rounded-lg overflow-hidden">
                <form onSubmit={handleSubmitRestaurant}>
                  <div className="relative bg-indigo-400 h-64">
                    <label className="absolute inset-0 cursor-pointer">
                      {restaurantCover ? (
                        <img
                          className="w-full h-full object-fit"
                          alt={restaurantName}
                          src={restaurantCover}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <Icon icon="image" color="#fff" size="8x" />
                          <div className="inline-block px-4 py-1 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-lg">
                            Add a preview image
                          </div>
                          <input
                            className="hidden"
                            type="file"
                            accept="image/png, image/jpeg"
                            placeholder="Cover"
                            onChange={e =>
                              setRestaurantCover(URL.createObjectURL(e.target.files[0]))
                            }
                          />
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="px-4 pt-4 pb-2 border-b">
                    <div className="text-xs leading-none">Name</div>
                    <div className="mt-1">
                      <input
                        className="w-full py-1"
                        type="text"
                        placeholder="What is the name of the restaurant?"
                        value={restaurantName}
                        onChange={e => setRestaurantName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="px-4 pt-4 pb-2 border-b">
                    <div className="text-xs leading-none">Location</div>
                    <div className="flex mt-1">
                      <div className="w-6/12">
                        <input
                          className="w-full py-1"
                          type="text"
                          placeholder="Latitude"
                          value={restaurantLocationLatitude}
                          onChange={e => setRestaurantLocationLatitude(e.target.value)}
                        />
                      </div>
                      <div className="w-6/12">
                        <input
                          className="w-full py-1"
                          type="text"
                          placeholder="Longitude"
                          value={restaurantLocationLongitude}
                          onChange={e => setRestaurantLocationLongitude(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pt-4 pb-2 border-b">
                    <div className="text-xs leading-none">Phone Number</div>
                    <div className="mt-1">
                      <input
                        className="w-full py-1"
                        type="text"
                        placeholder="Phone Number"
                        value={restaurantPhoneNumber}
                        onChange={e => setRestaurantPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="px-4 pt-4 pb-2 border-b">
                    <div className="text-xs leading-none">Website</div>
                    <div className="mt-1">
                      <input
                        className="w-full py-1"
                        type="text"
                        placeholder="Website"
                        value={restaurantWebsite}
                        onChange={e => setRestaurantWebsite(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="px-4 pt-4 pb-2">
                    <div className="text-xs leading-none">Address</div>
                    <div className="mt-1">
                      <input
                        className="w-full py-1"
                        type="text"
                        placeholder="Entrer the address of the restaurant"
                        value={restaurantAddress}
                        onChange={e => setRestaurantAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-100">
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 text-sm font-semibold text-indigo-600 rounded"
                        type="button"
                        onClick={() => {
                          setRestaurantAddress('');
                          setRestaurantLocationLatitude('');
                          setRestaurantLocationLongitude('');
                          setRestaurantName('');
                          setRestaurantWebsite('');
                          setRestaurantPhoneNumber('');
                          setShowAddRestaurant(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-indigo-600 rounded"
                        type="submit"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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
