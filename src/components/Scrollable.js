import React from 'react';

function Scrollable({ className = '', children, ...props }) {
  const scrollableRef = React.useRef(null);

  React.useEffect(() => scrollableRef.current.scrollTo(0, 0), []);

  return (
    <div
      ref={scrollableRef}
      className={`relative w-full h-full max-h-full overflow-x-hidden overflow-y-scroll ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Scrollable;
