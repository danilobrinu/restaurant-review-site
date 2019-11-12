import React from 'react';

function Tag({ color, className, children, ...props }) {
  return (
    <span
      className={`inline-block bg-${color}-200 text-xs capitalize text-${color}-800 tracking-wide font-semibold px-2 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Tag;
