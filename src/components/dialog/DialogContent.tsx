import React from 'react';
import { BaseProps } from '@/core/types/common';
import styles from './DialogContent.module.scss';

const DialogContent = ({ children }: BaseProps) => {
  return <div className={styles.content}>{children}</div>;
};

export default DialogContent;
