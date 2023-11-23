import classNames from 'classnames';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  variant: 'default' | 'white';
}

interface VariantType {
  default: string;
  white: string;
}

const LoadingSpinner = ({ variant }: LoadingSpinnerProps) => {
  return (
    <div
      className={classNames(
        styles.spinner,
        styles[variant as keyof VariantType],
      )}
    >
      <ImSpinner2 />
    </div>
  );
};

export default LoadingSpinner;
