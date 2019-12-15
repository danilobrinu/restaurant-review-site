import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Divider from './Divider';
import Review from './Review';
import Venue from './Venue';

////////////////////////////////////////////////////////////////////////////////////////////////////

function PlaceDetails({ place = null, handleDissmis = () => {}, handleClickAddReview = () => {} }) {
  return (
    <div className="w-full">
      <header>
        <nav className="flex items-center absolute top-0 right-0 p-6">
          <div
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer select-none"
            role="button"
            tabIndex="0"
            onKeyDown={e => {
              e.persist();

              if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
                handleDissmis(e);
              }
            }}
            onClick={e => {
              e.persist();

              handleDissmis(e);
            }}
          >
            <Icon className="text-gray-900" icon="times" />
          </div>
        </nav>

        <div className="mb-8">
          {place.cover ? (
            <img className="w-full h-64 object-cover bg-gray-200" alt="cover" src={place.cover} />
          ) : (
            <div className="w-full h-64 object-cover bg-gray-200" />
          )}
        </div>
        <div className="px-6">
          <div className="m-0">
            <span className="text-xs uppercase font-bold text-gray-600">Restaurant</span>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-bold leading-none text-gray-900 my-2">{place.name}</div>
            <div className="mt-2">
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
                <div className="mb-4">
                  <div className="text-2xl font-bold text-center">No Reviews, yet.</div>
                  <div className="text-center">
                    No reviews yet in this restaurant! Start adding a new review.
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section>
          <div className="mx-6">
            <button
              className="w-full py-4 text-sm font-semibold leading-none text-white uppercase tracking-wider bg-indigo-600 rounded-lg"
              onClick={e => {
                e.persist();

                handleClickAddReview(e);
              }}
            >
              Add Review
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PlaceDetails;
