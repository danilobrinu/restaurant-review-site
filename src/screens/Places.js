import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

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
  const [query, setQuery] = React.useState('');

  return (
    <>
      <header>
        <nav className="flex items-center h-20 border-b">
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
                      <Icon icon="search" size="w-18" />
                    </div>
                    <input
                      id="query"
                      className="flex-auto h-10 placeholder-gray-600 font-bold rounded"
                      name="query"
                      value={query}
                      placeholder="Search"
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
                        <Icon icon="times" size="w-18" />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </form>
          </div>
        </nav>
      </header>
      <main>
        {query.length < 1 && (
          <div className="flex items-center hover:bg-gray-100 border-b select-none" role="button" tabIndex="0">
            <div className="flex items-center justify-center w-12 h-12">
              <Icon icon="map-marker" />
            </div>
            <div className="text-sm">Use my current location</div>
          </div>
        )}
      </main>
    </>
  );
}

export default Places;
