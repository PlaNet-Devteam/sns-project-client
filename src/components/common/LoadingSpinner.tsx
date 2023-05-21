import React from 'react';
import RocketSVG from '@/assets/intro/rocket.svg';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div>
        <RocketSVG />
      </div>
    </div>
  );
}

export default LoadingSpinner;
