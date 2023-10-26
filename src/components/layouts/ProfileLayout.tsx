import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BaseProps } from '@/core/types/common';
import UserService from '@/services/user';
import { AxiosErrorResponseType } from '@/core/types/error/axios-error-response.type';
import useAuth from '@/hooks/useAuth';
import { profileState } from '@/store/profileAtom';
import { userState } from '@/store/userAtom';
import { FollowCreateType } from '@/core/types/follow';
import FollowService from '@/services/follow';
import ProfileInfo from '../profile/ProfileInfo';
import ProfileCount from '../profile/ProfileCount';
import ProfileFeedTabs from '../profile/ProfileFeedTabs';
import Button from '../common/Button';
import TopHeader from '../nav/topHeader/TopHeader';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfileLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { payload, onLogout } = useAuth();
  const myInfo = useRecoilValue(userState);
  const setProfie = useSetRecoilState(profileState);

  const { data: profile } = useQuery(
    ['user', router.query.username],
    () => {
      if (router.query.username === 'undefined') return router.push('/login');
      return UserService.findUserByUsername(router.query.username as string);
    },
    {
      onError: (error: AxiosErrorResponseType) => {
        if (error?.response?.status === 404) {
          alert(error?.response?.data.message);
        }
        router.push('/_error');
      },
    },
  );

  const { mutateAsync: followUserMutation, isLoading: isLoadingFollow } =
    useMutation({
      mutationFn: (formData: FollowCreateType) =>
        FollowService.createFollow(formData),
      onSuccess: () => {
        queryClient.invalidateQueries(['user', payload?.username]);
        queryClient.invalidateQueries(['user', router.query.username]);
      },
    });

  const { mutateAsync: unfollowUserMutation, isLoading: isLoadingUnfollow } =
    useMutation({
      mutationFn: (formData: FollowCreateType) =>
        FollowService.deleteFollow(formData),
      onSuccess: () => {
        queryClient.invalidateQueries(['user', payload?.username]);
        queryClient.invalidateQueries(['user', router.query.username]);
      },
    });

  const onClickFollowUser = async (followingId: number) => {
    if (payload) {
      await followUserMutation({
        userId: payload._id,
        followingId: followingId,
      });
    }
  };

  const onClickUnfollowUser = async (followingId: number) => {
    if (payload) {
      await unfollowUserMutation({
        userId: payload._id,
        followingId: followingId,
      });
    }
  };

  const onLogoutHandler = () => {
    onLogout();
  };

  useEffect(() => {
    setProfie(profile);
  }, [profile, setProfie]);

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
          {profile && (
            <>
              {payload?.username === profile.username && (
                <button onClick={() => router.push('/profile/edit')}>
                  편집
                </button>
              )}
            </>
          )}
        </TopHeader.Right>
      </TopHeader>
      {profile && (
        <div className="profile-layout">
          <ProfileInfo profile={profile} />
          {payload?.username === profile.username && (
            <div className="text-center">
              <Button
                variant="primary"
                size="sm"
                type="button"
                isEnglish
                onClick={onLogoutHandler}
              >
                LOGOUT
              </Button>
            </div>
          )}
          {payload && payload?._id !== profile.id && (
            <div className="text-center">
              {myInfo?.followingIds.includes(profile?.id) ? (
                <>
                  <Button
                    variant="gray"
                    size="sm"
                    onClick={() => onClickUnfollowUser(profile.id)}
                    className="profile-info__btn-follow"
                  >
                    {!isLoadingUnfollow ? '팔로우 취소' : <LoadingSpinner />}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onClickFollowUser(profile.id)}
                    className="profile-info__btn-follow"
                  >
                    {!isLoadingFollow ? '팔로우' : <LoadingSpinner />}
                  </Button>
                </>
              )}
            </div>
          )}
          <ProfileCount profile={profile} />
          <section className="profile-feeds">
            <ProfileFeedTabs />
            {children}
          </section>
        </div>
      )}
    </>
  );
};

export default ProfileLayout;
