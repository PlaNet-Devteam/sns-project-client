import React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { MessageType } from '@/core/types/message';
import useAuth from '@/hooks/useAuth';
import UserProfileImage from '../common/UserProfileImage';
import TypoText from '../common/TypoText';
import styles from './DirectMessageListItem.module.scss';

interface MessageListItemProps {
  item: MessageType;
  isFirst: boolean;
  isLast: boolean;
}

const MessageListItem = ({ item, isFirst, isLast }: MessageListItemProps) => {
  const { payload } = useAuth();
  const isMine = item.user.id === payload?._id;

  return (
    <>
      <div
        className={classNames(styles.item, {
          [styles.is_mine]: isMine,
          [styles.is_first]: isFirst,
          [styles.is_last]: isLast,
          [styles.is_next]: !isFirst,
        })}
      >
        <div className={styles.item_inner}>
          <div className={styles.item_content}>
            <div className={styles.item_profileImage}>
              {isFirst && (
                <UserProfileImage
                  username={item.user.username}
                  imagePath={item.user.profileImage}
                />
              )}
            </div>
            <div className={styles.item_messageInfo}>
              {isFirst && !isMine && (
                <div className={styles.item_username}>
                  <TypoText color="gray">{item.user.username}</TypoText>
                </div>
              )}
              <div className={styles.item_message}>{item.message}</div>
              {isLast && (
                <div className={styles.item_date}>
                  <>{dayjs(item.createdAt).format('A HH:mm')}</>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageListItem;
