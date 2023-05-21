import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BaseProps } from '@/core/types/common';
import JwtStorageService, { ACCESS_TOKEN } from '@/core/utils/jwt-storage';

function NoneLayout({ children }: BaseProps) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const accessToken = JwtStorageService.getToken(ACCESS_TOKEN);
    setIsAuth(accessToken ? true : false);
    if (isAuth) {
      router.replace('/profile');
    }
  }, [isAuth, router]);

  return <main>{children}</main>;
}

export default NoneLayout;
