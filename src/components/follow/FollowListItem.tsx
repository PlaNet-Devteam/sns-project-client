import React, { useState } from 'react';
import { FiUserPlus, FiTrash, FiUserMinus } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import { FollowCreateType, FollowType } from '@/core/types/follow';
import { FOLLOW, UserType } from '@/core';
import FollowService from '@/services/follow';
import { userState } from '@/store/userAtom';
import UserProfileImage from '../common/UserProfileImage';
import Button from '../common/Button';
import styles from './FollowListItem.module.scss';

interface FollowListItemProps {
  queryKey: string;
  item: FollowType;
  user: UserType;
}

const FollowListItem = ({ queryKey, item, user }: FollowListItemProps) => {
  const queryClient = useQueryClient();
  const myInfo = useRecoilValue(userState);
  const [followings, setFollowings] = useState<number[] | undefined>(
    myInfo?.followingIds,
  );

  const { mutateAsync: followUserMutation } = useMutation({
    mutationFn: (formData: FollowCreateType) =>
      FollowService.createFollow(formData),
    onSuccess: (data, formData) => {
      setFollowings((prevState) => {
        return prevState?.concat([formData.followingId]);
      });
      queryClient.invalidateQueries(['user', myInfo?.username]);
    },
  });

  const { mutateAsync: unfollowUserMutation } = useMutation({
    mutationFn: (formData: FollowCreateType) =>
      FollowService.deleteFollow(formData),
    onSuccess: (data, formData) => {
      setFollowings((prevState) => {
        return prevState?.filter((number) => number !== formData.followingId);
      });
      queryClient.invalidateQueries(['user', myInfo?.username]);
    },
  });

  const onClickFollowHandler = (item: FollowType) => {
    if (myInfo) {
      if (queryKey === FOLLOW.FOLLOWINGS) {
        followUserMutation({
          userId: myInfo?.id,
          followingId: item.followingId,
        });
      } else {
        followUserMutation({
          userId: myInfo?.id,
          followingId: item.userId,
        });
      }
    }
  };

  const onClickUnfollowHandler = (item: FollowType) => {
    if (myInfo) {
      unfollowUserMutation({
        userId: myInfo?.id,
        followingId: item.followingId,
      });
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_userProfile}>
        <div className={styles.item_profileImage}>
          <UserProfileImage
            username={user.username}
            imagePath={user.profileImage}
          />
        </div>
        <div className={styles.item_profileInfo}>
          <span className={styles.item_profileInfo_username}>
            {user.username}
          </span>
          <span className={styles.item_profileInfo_nickname}>
            {user.nickname}
          </span>
        </div>
      </div>
      {myInfo?.id !== user.id && (
        <>
          <div className={styles.item_options}>
            {queryKey === FOLLOW.FOLLOWINGS ? (
              <>
                {followings && !followings.includes(item.followingId) ? (
                  <>
                    <Button
                      variant="primary"
                      isFull={true}
                      isEnglish={true}
                      iconOnly
                      size="sm"
                      onClick={() => onClickFollowHandler(item)}
                    >
                      <FiUserPlus />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="gray"
                      isFull={true}
                      isEnglish={true}
                      iconOnly
                      size="sm"
                      onClick={() => onClickUnfollowHandler(item)}
                    >
                      <FiUserMinus />
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                {followings && !followings.includes(item.userId) && (
                  <>
                    <Button
                      variant="primary"
                      isFull={true}
                      isEnglish={true}
                      iconOnly
                      size="sm"
                      onClick={() => onClickFollowHandler(item)}
                    >
                      <FiUserPlus />
                    </Button>
                  </>
                )}
                <Button
                  variant="gray"
                  isFull={true}
                  isEnglish={true}
                  iconOnly
                  size="sm"
                >
                  <FiTrash />
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FollowListItem;
