import React from 'react';
import { BaseProps } from '@/core/types/common';

const BaseLayout = ({ children }: BaseProps) => {
  return (
    <main className="app-main">
      <div className="layout-container">{children}</div>
    </main>
  );
};

export default BaseLayout;
