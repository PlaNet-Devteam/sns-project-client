import React, { useEffect, useState } from 'react';
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
import { USER_STATUS, UserBlockCreateType } from '@/core';
import UserBlockService from '@/services/user-block';
import ProfileInfo from '../profile/ProfileInfo';
import ProfileCount from '../profile/ProfileCount';
import ProfileFeedTabs from '../profile/ProfileFeedTabs';
import Button from '../common/Button';
import TopHeader from '../nav/topHeader/TopHeader';
import LoadingSpinner from '../common/LoadingSpinner';
import InactivatedUser from '../common/InactivatedUser';
import Dialog from '../dialog/Dialog';

const ProfileLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { payload, onLogout } = useAuth();
  const myInfo = useRecoilValue(userState);
  const setProfie = useSetRecoilState(profileState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: profile } = useQuery(
    ['user', router.query.username],
    () => {
      if (router.query.username === 'undefined') return router.push('/login');
      if (payload?._id) {
        // 로그인한 상태라면 'viewer id' 에 나의 아이디 전송
        return UserService.findUserByUsername(router.query.username as string, {
          viewerId: payload?._id,
        });
      } else {
        return UserService.findUserByUsername(router.query.username as string);
      }
    },
    {
      onError: (error: AxiosErrorResponseType) => {
        if (error?.response?.status === 404) {
          router.push('/_error');
        }
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

  const { mutateAsync: userBlockMutation, isLoading: isLoadingUserBlock } =
    useMutation({
      mutationFn: (formData: UserBlockCreateType) => {
        if (profile?.isBlockedByViewer) {
          return UserBlockService.deleteUserBlock(formData);
        } else {
          return UserBlockService.createUserBlock(formData);
        }
      },
      onSuccess: () => {
        setIsModalOpen(false);
        queryClient.invalidateQueries(['user', payload?.username]);
        queryClient.invalidateQueries(['user', router.query.username]);
      },
    });

  const onClickUserBlockHandler = (
    createUserBlockType: UserBlockCreateType,
  ) => {
    userBlockMutation(createUserBlockType);
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
          {payload && profile ? (
            <>
              <button onClick={() => setIsModalOpen(true)}>설정</button>
            </>
          ) : (
            <button onClick={() => router.push('/login')}>로그인</button>
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
              {profile?.isBlockedByViewer ? (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      onClickUserBlockHandler({
                        userId: payload._id,
                        blockedUserId: profile.id,
                      })
                    }
                  >
                    {!isLoadingUserBlock ? (
                      '차단 해제'
                    ) : (
                      <LoadingSpinner variant="white" />
                    )}
                  </Button>
                </>
              ) : (
                <>
                  {myInfo?.followingIds &&
                  myInfo?.followingIds.includes(profile?.id) ? (
                    <>
                      <Button
                        variant="gray"
                        size="sm"
                        onClick={() => onClickUnfollowUser(profile.id)}
                      >
                        {!isLoadingUnfollow ? (
                          '팔로우 취소'
                        ) : (
                          <LoadingSpinner variant="white" />
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onClickFollowUser(profile.id)}
                      >
                        {!isLoadingFollow ? (
                          '팔로우'
                        ) : (
                          <LoadingSpinner variant="white" />
                        )}
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          )}
          <ProfileCount profile={profile} />
          <section className="profile-feeds">
            <ProfileFeedTabs />
            {payload ? ( // 1 - 로그인 상태
              <>
                {payload.username !== profile.username ? ( // 2 -다른 유저 프로필
                  <>
                    {myInfo?.followingIds &&
                    !myInfo?.followingIds.includes(profile?.id) &&
                    profile.status === USER_STATUS.INACTIVE ? ( // 3- 유저 비활성 상태 & 팔로잉 안 했을 경우
                      <>
                        <InactivatedUser />
                      </>
                    ) : (
                      // 3- 유저 비활성 상태 & 팔로잉 했을 경우
                      <> {children}</>
                    )}
                  </>
                ) : (
                  // 2- 내 프로필
                  <> {children}</>
                )}
              </>
            ) : (
              // 1 - 미 로그인 상태
              <>
                {profile.status === USER_STATUS.INACTIVE ? ( // 2 - 유저 비활성 상태
                  <>
                    <InactivatedUser />
                  </>
                ) : (
                  // 2 - 유저 활성화 상태
                  <>{children}</>
                )}
              </>
            )}
          </section>
        </div>
      )}

      <Dialog isOpen={isModalOpen}>
        <Dialog.Dimmed onClick={() => setIsModalOpen(false)} />
        {payload?.username === profile?.username && (
          <Dialog.LabelButton
            color="essential"
            onClick={() => router.push('/profile/edit')}
          >
            프로필 편집
          </Dialog.LabelButton>
        )}
        {payload?.username === profile?.username && (
          <Dialog.LabelButton
            color="white"
            onClick={() => router.push('/settings')}
          >
            설정 및 개인정보
          </Dialog.LabelButton>
        )}
        {payload?.username === profile?.username && (
          <Dialog.LabelButton
            color="white"
            onClick={() => router.push('/settings/archived')}
          >
            피드 보관함
          </Dialog.LabelButton>
        )}
        {payload?.username === profile?.username && (
          <Dialog.LabelButton color="danger" onClick={onLogout}>
            로그아웃
          </Dialog.LabelButton>
        )}
        {payload && payload?.username !== profile?.username && (
          <Dialog.LabelButton
            color="danger"
            onClick={() =>
              onClickUserBlockHandler({
                userId: payload?._id,
                blockedUserId: profile?.id,
              })
            }
          >
            {profile?.isBlockedByViewer ? '차단 해제' : '차단'}
          </Dialog.LabelButton>
        )}
        <Dialog.LabelButton color="gray" onClick={() => setIsModalOpen(false)}>
          닫기
        </Dialog.LabelButton>
      </Dialog>
    </>
  );
};

export default ProfileLayout;
