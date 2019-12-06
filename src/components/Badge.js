import React from 'react';

function Badge({ className, children, ...props }) {
  return (
    <span
      className={`inline-block tracking-wide font-semibold px-2 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
