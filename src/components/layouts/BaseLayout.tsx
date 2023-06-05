import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import UserService from '@/services/user';
import { BaseProps } from '@/core/types/common';
import { userState } from '@/store/userAtom';

const BaseLayout = ({ children }: BaseProps) => {
  const setUserState = useSetRecoilState(userState);
  const { data: profile } = useQuery(['user'], () => UserService.getFindMe());

  useEffect(() => {
    setUserState(profile);
    console.log('userState', profile?.id);
  }, [profile, setUserState]);

  return (
    <main className="app-main">
      <div className="layout-container">{children}</div>
    </main>
  );
};

export default BaseLayout;
