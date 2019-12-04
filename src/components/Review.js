import React from 'react';

function Review({ avatar, author, date, comment }) {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div className="w-12 h-12">
          <img className="w-12 h-12 object-fit rounded-full" alt={author} src={avatar} />
        </div>
        <div className="ml-2">
          <div className="text-sm leading-snug font-bold text-gray-900">{author}</div>
          <div className="text-sm leading-snug text-gray-600">{date}</div>
        </div>
      </div>
      <div className="my-4">
        <div dir="ltr" className="text-base text-gray-900">
          {comment}
        </div>
      </div>
    </div>
  );
}

export default Review;
