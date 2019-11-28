import React from 'react';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Place from '../components/Place';

////////////////////////////////////////////////////////////////////////////////////////////////////

function PlaceListLoading() {
  return <div>Loading...</div>;
}

function PlaceList({ places }) {
  return (
    <div>
      {places.map(({ id, name, cover, tags, rating, reviews, location }) => (
        <Place
          key={`place-${id}`}
          id={id}
          name={name}
          cover={cover}
          tags={tags}
          rating={rating}
          reviews={reviews}
          location={location}
        />
      ))}
    </div>
  );
}

function Places() {
  const mapRef = React.useRef();
  const [places, setPlaces] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 48.8737815, lng: 2.3501649 },
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      gestureHandling: 'cooperative',
    });

    const pyrmont = new window.google.maps.LatLng(48.8737815, 2.3501649);
    const request = {
      location: pyrmont,
      radius: '500',
      type: ['restaurant'],
    };

    const service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
      console.log(results);

      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const places = results.map(
          ({
            place_id = '',
            name = '',
            photos = [{ getUrl: () => null }],
            types = [],
            rating = 0,
            user_ratings_total = 0,
            geometry: { location },
            icon = '',
          }) => ({
            id: place_id,
            cover: photos[0].getUrl(),
            tags: types.map(type => type.replace(/_/g, ' ')),
            rating: rating.toFixed(1),
            reviews: Array(user_ratings_total),
            name,
            location,
            icon,
          })
        );

        setPlaces(places);
      }

      setLoading(false);
    });
  }, []);

  console.log(places);

  return (
    <div className="absolute inset-0">
      <div className="relative w-full h-full">
        <div className="relative w-full max-w-xl h-full">
          {/* scrollable */}
          <div className="max-h-full overflow-x-hidden overflo-y-auto scrolling-touch">
            <div>
              <div className="px-6 py-5">
                <div className="mb-4">
                  <div className="py-1 text-2xl font-bold">Top recommendations from locals</div>
                  <div>
                    From sightseeing to hidden gems, find out what makes the city unique with the
                    help of the locals who know it best.
                  </div>
                </div>
                {loading ? <PlaceListLoading /> : <PlaceList places={places} />}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed top-0 right-0 h-full" style={{ left: '36rem' }}>
          <div className="w-full h-full" ref={mapRef} />
        </div>
      </div>
    </div>
  );
}

export default Places;
