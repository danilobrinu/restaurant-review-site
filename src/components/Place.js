import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Tag from './Tag';

////////////////////////////////////////////////////////////////////////////////////////////////////

function PlaceTags({ tags }) {
  return (
    <div>
      {tags.map(tag => (
        <Tag key={`place-tag-${tag}`} className="mr-2" color="purple">
          {tag}
        </Tag>
      ))}
    </div>
  );
}

function Place({
  id,
  name = '',
  cover = '',
  rating = 0,
  tags = [],
  reviews = [],
  onClick = () => {},
}) {
  const match = useRouteMatch();

  return (
    <Link to={`${match.url}/${id}`}>
      <div role="button" className="flex p-3 -mx-3 rounded hover:shadow-lg" onClick={onClick}>
        <div className="w-32 min-w-32 h-32">
          {cover ? (
            <img alt="cover" className="w-32 h-32 object-cover bg-gray-200 rounded" src={cover} />
          ) : (
            <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded">
              <span className="uppercase text-lg font-bold">{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start w-full pl-4">
          <div className="flex items-start mb-2">
            <Tag className="mr-2" color="indigo">
              {rating}
            </Tag>
            <span className="inline-block text-lg leading-none font-bold">{name}</span>
          </div>
          <PlaceTags tags={tags} />
          <div className="text-xs font-bold mt-auto">{reviews.length} reviews</div>
        </div>
      </div>
    </Link>
  );
}

export default Place;
