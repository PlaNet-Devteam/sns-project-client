import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserBlockCreateType, UserBlockType } from '@/core';
import UserBlockService from '@/services/user-block';
import UserProfileImage from '../common/UserProfileImage';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import styles from './UserBlockListItem.module.scss';

interface UserBlockListItemProps {
  item: UserBlockType;
}

const UserBlockListItem = ({ item }: UserBlockListItemProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (formData: UserBlockCreateType) =>
      UserBlockService.deleteUserBlock(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['blockUsers']);
    },
  });

  const onClickUnblockHandler = async (formData: UserBlockCreateType) => {
    await mutateAsync(formData);
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_userProfile}>
        <div className={styles.item_profileImage}>
          <UserProfileImage
            username={item.blockedUser.username}
            imagePath={item.blockedUser.profileImage}
          />
        </div>
        <div className={styles.item_profileInfo}>
          <span className={styles.item_profileInfo_username}>
            {item.blockedUser.username}
          </span>
          <span className={styles.item_profileInfo_nickname}>
            {item.blockedUser.nickname}
          </span>
        </div>
      </div>
      <div className={styles.item_options}>
        <Button
          variant="gray"
          size="sm"
          onClick={() =>
            onClickUnblockHandler({
              userId: item.userId,
              blockedUserId: item.blockedUserId,
            })
          }
        >
          {isLoading ? <LoadingSpinner variant="white" /> : <>차단 해제</>}
        </Button>
      </div>
    </div>
  );
};

export default UserBlockListItem;
