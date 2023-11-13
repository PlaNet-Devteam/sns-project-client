import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  BsBookmark,
  BsBookmarkFill,
  BsSuitHeart,
  BsSuitHeartFill,
} from 'react-icons/bs';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BiComment } from 'react-icons/bi';
import { FeedType } from '@/core';
import FeedService from '@/services/feed';
import styles from './FeedItemActionButtons.module.scss';

interface FeedItemActionButtonsProps {
  item: FeedType;
}

const FeedItemActionButtons = ({ item }: FeedItemActionButtonsProps) => {
  const queryClient = useQueryClient();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false);
  }, []);

  const likeFeedItemMutation = useMutation({
    mutationKey: ['like-feed', item.id],
    mutationFn: (feedId: number) => FeedService.likeFeed(feedId),
    onSuccess: () => {
      return queryClient.invalidateQueries(['feeds']);
    },
  });

  const deleteLikeFeedItemMutation = useMutation({
    mutationKey: ['delete-like-feed', item.id],
    mutationFn: (feedId: number) => FeedService.delteLikeFeed(feedId),
    onSuccess: () => {
      return queryClient.invalidateQueries(['feeds']);
    },
  });

  const onClickFeedLkeHandler = (feedId: number) => {
    if (item.likedYn) {
      deleteLikeFeedItemMutation.mutate(feedId);
      setIsClicked(false);
    } else {
      likeFeedItemMutation.mutate(feedId);
      setIsClicked(true);
    }
  };

  const bookmarkFeedItemMutation = useMutation({
    mutationKey: ['bookmark-feed', item.id],
    mutationFn: (feedId: number) => FeedService.bookmarkFeed(feedId),
    onSuccess: () => {
      return queryClient.invalidateQueries(['feeds']);
    },
  });

  const deleteBookmarkFeedItemMutation = useMutation({
    mutationKey: ['delete-bookmark-feed', item.id],
    mutationFn: (feedId: number) => FeedService.deleteBookmarkFeed(feedId),
    onSuccess: () => {
      return queryClient.invalidateQueries(['feeds']);
    },
  });

  const onClickBookmarkHandler = (feedId: number) => {
    if (item.bookmarkedYn) {
      deleteBookmarkFeedItemMutation.mutate(feedId);
    } else {
      bookmarkFeedItemMutation.mutate(feedId);
    }
  };

  return (
    <div className={styles.buttons}>
      <div className={styles.buttons_leftArea}>
        <button
          className={classNames([styles.button], {
            [styles.is_active]: item.likedYn === true,
            [styles.is_animated]: isClicked,
          })}
          onClick={() => onClickFeedLkeHandler(item.id)}
        >
          {item.likedYn ? (
            <BsSuitHeartFill color="red" size={'1.5rem'} />
          ) : (
            <BsSuitHeart color="white" size={'1.5rem'} />
          )}
        </button>
        <Link href={`/feed/${item.id}/comment`} className={styles.button}>
          <BiComment color="white" size={'1.5rem'} />
        </Link>
      </div>
      <div className={styles.buttons_rightArea}>
        <button
          className={styles.button}
          onClick={() => onClickBookmarkHandler(item.id)}
        >
          {item.bookmarkedYn ? (
            <BsBookmarkFill color="white" size={'1.5rem'} />
          ) : (
            <BsBookmark color="white" size={'1.5rem'} />
          )}
        </button>
      </div>
    </div>
  );
};

export default FeedItemActionButtons;
