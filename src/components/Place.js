import React from 'react';

////////////////////////////////////////////////////////////////////////////////////////////////////

import RatingBadge from './RatingBadge';
import RestaurantTypeBadge from './RestaurantTypeBadge';

////////////////////////////////////////////////////////////////////////////////////////////////////

function PlaceTags({ tags }) {
  return (
    <div>
      {tags.map(tag => (
        <RestaurantTypeBadge key={`place-tag-${tag}`} className="mr-2">
          {tag}
        </RestaurantTypeBadge>
      ))}
    </div>
  );
}

function Place({
  name = '',
  cover = '',
  rating = 0,
  ratings = 0,
  types = [],
  handleClick = () => {},
  ...props
}) {
  return (
    <div
      role="button"
      tabIndex="0"
      className="flex p-3 -mx-3 my-2 rounded hover:shadow-md focus:shadow-md"
      onKeyDown={e => {
        e.persist();

        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
          handleClick(e);
        }
      }}
      onClick={e => {
        e.persist();

        handleClick(e);
      }}
      {...props}
    >
      <div className="w-32 min-w-32 h-32">
        {cover ? (
          <img alt="cover" className="w-32 h-32 object-cover bg-gray-200 rounded" src={cover} />
        ) : (
          <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded">
            <span className="uppercase text-lg font-bold">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-start flex-1 pl-4">
        <div className="flex items-start mb-2">
          <RatingBadge className="mr-2">{rating.toFixed(1) || 'New'}</RatingBadge>
          <span className="inline-block text-lg font-bold leading-none text-gray-900">{name}</span>
        </div>
        <PlaceTags tags={types} />
        <div className="text-xs font-bold text-gray-600 mt-auto">
          {ratings > 0 ? `${ratings} ratings` : 'Without ratings'}
        </div>
      </div>
    </div>
  );
}

export default Place;
