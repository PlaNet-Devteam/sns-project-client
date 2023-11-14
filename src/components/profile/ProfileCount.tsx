import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { FOLLOW, UserType, followTransformer } from '@/core';
import useAuth from '@/hooks/useAuth';
import { userState } from '@/store/userAtom';
import Modal from '../common/Modal';
import FollowList from '../follow/FollowList';

interface ProfileCountType {
  profile: UserType;
}

function ProfileCount({ profile }: ProfileCountType) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { payload } = useAuth();
  const myInfo = useRecoilValue(userState);
  const [queryKey, setQueryKey] = useState('');
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const isVisibleFollowModal =
    payload?.username !== profile.username &&
    !myInfo?.followingIds?.includes(profile.id);

  const onClickFollowUserModalOpen = (queryKey: string) => {
    if (profile?.isBlockedByViewer) return;
    if (!payload) return alert('로그인이 필요합니다');
    if (isVisibleFollowModal) return alert('리스트를 보려면 팔로우하세요');
    setQueryKey(queryKey);
    setIsFollowingModalOpen(true);
  };

  const onClickFollowUserModalClose = () => {
    setIsFollowingModalOpen(false);
    setQueryKey('');
    return queryClient.invalidateQueries(['user', router.query.username]);
  };

  useEffect(() => {
    setIsFollowingModalOpen(false);
  }, [router.query.username]);

  return (
    <>
      <section className="profile-counts">
        <div className="profile-counts__box">
          <span className="profile-counts__title">피드</span>
          <p className="profile-counts__count">{profile?.feedCount}</p>
        </div>
        <button
          className="profile-counts__box"
          onClick={() => onClickFollowUserModalOpen(FOLLOW.FOLLOWERS)}
        >
          <span className="profile-counts__title">팔로워</span>
          <p className="profile-counts__count">
            {profile?.isBlockedByViewer ? 0 : profile?.followerCount}
          </p>
        </button>
        <button
          className="profile-counts__box"
          onClick={() => onClickFollowUserModalOpen(FOLLOW.FOLLOWINGS)}
        >
          <span className="profile-counts__title">팔로잉</span>
          <p className="profile-counts__count">
            {profile?.isBlockedByViewer ? 0 : profile?.followingCount}
          </p>
        </button>
      </section>
      {isFollowingModalOpen && (
        <Modal
          variant="default"
          headerText={
            queryKey === FOLLOW.FOLLOWINGS
              ? followTransformer(FOLLOW.FOLLOWINGS)
              : followTransformer(FOLLOW.FOLLOWERS)
          }
          isModalOpen={isFollowingModalOpen}
          onClickCloseModal={() => onClickFollowUserModalClose()}
        >
          <FollowList queryKey={queryKey} />
        </Modal>
      )}
    </>
  );
}

export default ProfileCount;
