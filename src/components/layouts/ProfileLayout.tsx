import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { BaseProps } from '@/core/types/common';
import JwtStorageService, {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '@/core/utils/jwt-storage';
import UserService from '@/services/user';
import { userState } from '@/store/userAtom';
import ProfileInfo from '../profile/ProfileInfo';
import ProfileCount from '../profile/ProfileCount';
import ProfileFeedTabs from '../profile/ProfileFeedTabs';
import Button from '../common/Button';
import ButtonGroup from '../common/ButtonGroup';
import TopHeader from '../nav/topHeader/TopHeader';

const ProfileLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const { data: profile } = useQuery(['user'], () => UserService.getFindMe());

  const onLogoutHandler = () => {
    JwtStorageService.removeToken(ACCESS_TOKEN);
    JwtStorageService.removeToken(REFRESH_TOKEN);
    router.replace('/login');
  };

  useEffect(() => {
    setUser(profile);
  }, [profile, setUser]);

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>
          <h1 className="blind">프로필</h1>
        </TopHeader.Title>
        <TopHeader.Right>
          <button onClick={() => router.push('/profile/edit')}>편집</button>
        </TopHeader.Right>
      </TopHeader>
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
