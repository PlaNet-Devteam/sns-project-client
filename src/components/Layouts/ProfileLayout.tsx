import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { BaseProps } from '@/core/types/common';
import JwtStorageService, {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '@/core/utils/jwt-storage';
import UserService from '@/services/user';
import ProfileInfo from '../Profile/ProfileInfo';
import ProfileCount from '../Profile/ProfileCount';
import ProfileFeedTabs from '../Profile/ProfileFeedTabs';
import Button from '../common/Button';
import ButtonGroup from '../common/ButtonGroup';

const ProfileLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const { data: profile } = useQuery(['user'], () => UserService.getFindMe());

  const onLogoutHandler = () => {
    JwtStorageService.removeToken(ACCESS_TOKEN);
    JwtStorageService.removeToken(REFRESH_TOKEN);
    router.replace('/login');
  };

  return (
    <>
      {profile && (
        <div className="profile-layout">
          <ProfileInfo profile={profile} />
          <ProfileCount profile={profile} />
          <section className="profile-feeds">
            <ProfileFeedTabs />
            {children}
          </section>
          <ButtonGroup>
            <Button
              size="md"
              variant="primary"
              type="button"
              isEnglish
              isFull
              onClick={onLogoutHandler}
            >
              LOGOUT
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

export default ProfileLayout;
