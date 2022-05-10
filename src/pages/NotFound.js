import React from 'react';
import Empty from '../images/empty.gif';

function NotFound() {
  return (
    <div className="d-flex justify-content-center flex-column">
      <h1 className="input-text d-flex justify-content-center p-4 mt-3">Not Found</h1>
      <img
        className="not-found m-4"
        src={ Empty }
        alt="Empty pantry"
      />
    </div>
  );
}

export default NotFound;
