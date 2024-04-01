import React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { RoomType } from '@/core/types/room';
import { formattedDate } from '@/utils/formattedDate';
import useAuth from '@/hooks/useAuth';
import UserProfileImage from '../common/UserProfileImage';
import styles from './RoomListItem.module.scss';

interface RoomListItemProps {
  item: RoomType;
}

const RoomListItem = ({ item }: RoomListItemProps) => {
  const router = useRouter();
  const roomUsers = item.users.map((user) => user.username).join(', ');
  const { payload } = useAuth();

  return (
    <div
      onClick={() => router.push(`/direct/${item.roomUniqueId}`)}
      className={styles.item}
    >
      <div
        className={classNames(styles.item_profileImages, {
          [styles.is_groups]: item.users.length > 1,
        })}
      >
        {item.users.map((user) => (
          <div className={styles.item_profileImage} key={user.id}>
            <UserProfileImage imagePath={user.profileImage} />
          </div>
        ))}
      </div>
      <div className={styles.item_profileInfo}>
        <div className={styles.item_usernames}>{roomUsers}</div>
        <div className={styles.item_messages}>
          {item.messages && item.messages[0] && (
            <>
              {item.messages[0].userId === payload?._id
                ? '나: '
                : `${item.messages[0].user.username}: `}
              {item.messages[0].message}
              &nbsp;·&nbsp;
              <span>
                {formattedDate()(item.messages[0].createdAt as string)}
              </span>
            </>
          )}
          {!item.messages.length && <>새로운 메세지를 입력해주세요</>}
        </div>
      </div>
    </div>
  );
};

export default RoomListItem;
