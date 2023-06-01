import React from 'react';
import { BaseProps } from '@/core/types/common';

const ButtonGroup = ({ children }: BaseProps) => {
  return <div className="button-group">{children}</div>;
};

export default ButtonGroup;
