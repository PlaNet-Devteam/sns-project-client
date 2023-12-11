import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { FaPaperPlane } from 'react-icons/fa';
import { UserType } from '@/core';
import RoomService from '@/services/room';
import useAuth from '@/hooks/useAuth';
import { userState } from '@/store/userAtom';
import UserProfileImage from '../common/UserProfileImage';
import styles from './DirectMessageUserListItem.module.scss';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

interface DirectMessageUserListItemProps {
  item: UserType;
}

const DirectMessageUserListItem = ({
  item,
}: DirectMessageUserListItemProps) => {
  const { payload } = useAuth();

  const onClickCreateRoomHandler = (userId: number) => {
    socket.emit('create_room', {
      userId: payload?._id,
      userIds: [payload?._id, userId],
    });
  };

  return (
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
  );
};

export default DirectMessageUserListItem;
