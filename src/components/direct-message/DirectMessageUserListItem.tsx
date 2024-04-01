import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { UserType } from '@/core';
import useAuth from '@/hooks/useAuth';
import useSocket from '@/hooks/useSocket';
import UserProfileImage from '../common/UserProfileImage';
import styles from './DirectMessageUserListItem.module.scss';

interface DirectMessageUserListItemProps {
  item: UserType;
}

const DirectMessageUserListItem = ({
  item,
}: DirectMessageUserListItemProps) => {
  const { payload } = useAuth();
  const socket = useSocket();

  const onClickCreateRoomHandler = (userId: number) => {
    socket.emit('create_room', {
      userId: payload?._id,
      userIds: [payload?._id, userId],
    });
  };

  return (
    <>
      {item.id !== payload?._id && (
        <>
          <div className={styles.item}>
            <div className={styles.item_userProfile}>
              <div className={styles.item_profileImage}>
                <UserProfileImage
                  username={item.username}
                  imagePath={item.profileImage}
                />
              </div>
              <div className={styles.item_profileInfo}>
                <span className={styles.item_profileInfo_username}>
                  {item.username}&nbsp;
                </span>
                <span className={styles.item_profileInfo_nickname}>
                  {item.nickname}
                </span>
              </div>
            </div>
            <div>
              <button onClick={() => onClickCreateRoomHandler(item.id)}>
                <FaPaperPlane color="white" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DirectMessageUserListItem;
