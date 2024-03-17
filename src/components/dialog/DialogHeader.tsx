import React from 'react';
import { BaseProps } from '@/core';
import styles from './DialogHeader.module.scss';

const DialogHeader = ({ children }: BaseProps) => {
  return <div className={styles.header}>{children}</div>;
};

export default DialogHeader;
