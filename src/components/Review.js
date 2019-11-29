import React from 'react';

function Review({ photo, author, date, comment }) {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div className="w-12 h-12">
          <img className="w-12 h-12 rounded-full" alt={author} src={photo} />
        </div>
        <div className="ml-2">
          <div className="text-sm leading-snug font-bold">{author}</div>
          <div className="text-sm leading-snug">{date}</div>
        </div>
      </div>
      <div className="my-4">
        <div dir="ltr" className="text-base">
          {comment}
        </div>
      </div>
    </div>
  );
}

export default Review;
