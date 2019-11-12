import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Divider from '../components/Divider';
import Review from '../components/Review';
import Venue from '../components/Venue';

////////////////////////////////////////////////////////////////////////////////////////////////////

function Place() {
  const { placeId } = useParams();

  return (
    <>
      <header>
        <nav className="flex items-center h-16 border-b">
          <Link className="block w-full" to="/places">
            <div
              className="flex items-center w-full h-12 cursor-pointer select-none"
              role="button"
              tabIndex="0"
            >
              <div className="flex items-center justify-center w-12 h-12">
                <Icon icon="chevron-left" />
              </div>
              <div className="text-sm leading-none">Back to places</div>
            </div>
          </Link>
        </nav>

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
      <main>
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
      </main>
    </>
  );
}

export default Place;
