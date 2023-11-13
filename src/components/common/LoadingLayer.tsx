import React from 'react';
import { createPortal } from 'react-dom';
import LoadingAni from './LoadingAni';

function LoadingLayer() {
  return createPortal(
    <div className="loading-layer">
      <LoadingAni />
    </div>,
    document.body,
  );
}

export default LoadingLayer;
