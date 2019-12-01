import React from 'react';

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

function Place({ name = '', cover = '', rating = 0, ratings = 0, types = [], ...props }) {
  return (
    <div
      role="button"
      className="flex p-3 -mx-3 my-2 rounded hover:shadow-md focus:shadow-md"
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
          <Tag className="mr-2" color="indigo">
            {rating || 'New'}
          </Tag>
          <span className="inline-block text-lg leading-none font-bold">{name}</span>
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
