import React from 'react';
import styles from './LoadingSpinner.module.scss';
import LoadingSpinner from './LoadingSpinner';

interface LoadingSpinnerContainerProps {
  isLoading?: boolean;
}

const LoadingSpinnerContainer = ({
  isLoading,
}: LoadingSpinnerContainerProps) => {
  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner variant="white" />}
    </div>
  );
};

export default LoadingSpinnerContainer;
