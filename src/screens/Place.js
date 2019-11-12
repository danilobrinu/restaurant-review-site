import React from 'react';
import { useParams } from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Divider from '../components/Divider';
import Review from '../components/Review';
import Venue from '../components/Venue';

////////////////////////////////////////////////////////////////////////////////////////////////////

function Place() {
  const mapRef = React.useRef();
  const { placeId } = useParams();

  console.log(placeId);

  React.useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 48.8737815, lng: 2.3501649 },
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      gestureHandling: 'cooperative',
    });
  }, []);

  return (
    <div className="absolute inset-0">
      <div className="relative w-full h-full">
        <div className="relative w-full max-w-xl h-full">
          {/* scrollable */}
          <div className="max-h-full overflow-x-hidden overflo-y-auto scrolling-touch">
            <div>
              <header>
                <div className="mb-8">
                  <img
                    className="w-full h-64 object-cover"
                    alt="cover"
                    src="https://a0.muscache.com/im/pictures/ffb63c20-6652-4723-b9d7-bbd58f756769.jpg?aki_policy=large"
                  />
                </div>
                <div className="px-6">
                  <div className="m-0">
                    <span className="text-xs uppercase font-bold text-gray-600">Restaurant</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-4xl font-bold leading-none my-2">
                      Beach Chalet Brewery and Restaurant
                    </div>
                    <div>
                      <span className="text-sm">200 reviews</span>
                    </div>
                  </div>
                </div>
              </header>

              <Divider className="mx-6" />

              <section>
                <div className="mx-6">
                  <Venue />
                </div>
              </section>

              <Divider className="mx-6" />

              <section>
                <div className="mx-6">
                  <header className="mb-6">
                    <span className="text-2xl font-bold">Tips from locals</span>
                  </header>

                  <Review
                    author="Lesley"
                    date="September 14, 2019"
                    comment="Won the best burrito in the US contest, be prepared to wait in the line."
                  />
                </div>
              </section>
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

export default Place;
