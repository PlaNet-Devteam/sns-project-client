import React from 'react';
import { BaseProps } from '@/core/types/common';

interface ErrorMessageProps extends BaseProps {
  errorMessage: string[];
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  if (typeof errorMessage === 'string') {
    return (
      <div className="error-message">
        {errorMessage && (
          <p>
            <span>{errorMessage}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="error-message">
      {errorMessage &&
        errorMessage?.map((message: string, index: number) => (
          <p key={index}>
            <span>{message}</span>
          </p>
        ))}
    </div>
  );
};

export default ErrorMessage;
