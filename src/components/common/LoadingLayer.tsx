import React from 'react';
import RocketSVG from '@/assets/intro/rocket.svg';

function LoadingLayer() {
  return (
    <div className="loading-layer">
      <div>
        <RocketSVG />
      </div>
    </div>
  );
}

export default LoadingLayer;
