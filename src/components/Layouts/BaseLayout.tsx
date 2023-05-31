import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BaseProps } from '@/core/types/common';
import JwtStorageService from '@/core/utils/jwt-storage';

function BaseLayout({ children }: BaseProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = JwtStorageService.getToken();
      if (!accessToken) {
        router.replace('/login');
      }
    }
  }, [router]);

  return (
    <main className="app-main">
      <div className="layout-container">{children}</div>
    </main>
  );
}

export default BaseLayout;
