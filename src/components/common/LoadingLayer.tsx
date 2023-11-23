import React from 'react';
import { createPortal } from 'react-dom';
import LoadingAni from './LoadingAni';
import styles from './LoadingLayer.module.scss';

function LoadingLayer() {
  return createPortal(
    <div className={styles.layer}>
      <LoadingAni />
    </div>,
    document.body,
  );
}

export default LoadingLayer;
