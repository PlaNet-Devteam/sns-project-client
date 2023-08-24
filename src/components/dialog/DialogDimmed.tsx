import React, { MouseEventHandler } from 'react';
import { BaseProps } from '@/core/types/common';
import styles from './DialogDimmed.module.scss';

interface DialogDimmedProps extends BaseProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const DialogDimmed = ({ onClick }: DialogDimmedProps) => {
  return <div className={styles.dimmed} onClick={onClick}></div>;
};

export default DialogDimmed;
