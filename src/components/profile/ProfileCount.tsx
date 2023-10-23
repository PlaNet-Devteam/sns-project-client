import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FOLLOW, UserType, followTransformer } from '@/core';
import Modal from '../common/Modal';
import FollowList from '../follow/FollowList';

interface ProfileCountType {
  profile: UserType;
}

function ProfileCount({ profile }: ProfileCountType) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [queryKey, setQueryKey] = useState('');
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const onClickFollowUserModalOpen = (queryKey: string) => {
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
        <div
          className="profile-counts__box"
          onClick={() => onClickFollowUserModalOpen(FOLLOW.FOLLOWERS)}
        >
          <span className="profile-counts__title">팔로워</span>
          <p className="profile-counts__count">{profile?.followerCount}</p>
        </div>
        <div
          className="profile-counts__box"
          onClick={() => onClickFollowUserModalOpen(FOLLOW.FOLLOWINGS)}
        >
          <span className="profile-counts__title">팔로잉</span>
          <p className="profile-counts__count">{profile?.followingCount}</p>
        </div>
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
