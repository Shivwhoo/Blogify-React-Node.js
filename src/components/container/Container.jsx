import React from 'react';

const Container = ({ children }) => {
  return (
    /* max-w-7xl: Limits the width (usually around 1280px)
       mx-auto: Centers the container
       px-4/md:px-16: Adds breathing room on the sides so text doesn't touch the screen edge
    */
    <div className="w-full max-w-7xl mx-auto px-4 md:px-16 lg:px-24">
      {children}
    </div>
  );
};

export default Container;