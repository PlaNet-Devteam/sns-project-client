import React from 'react';
import { BaseProps } from '@/core/types/common';

const NoneLayout = ({ children }: BaseProps) => {
  return <main className="app-main">{children}</main>;
};

export default NoneLayout;
