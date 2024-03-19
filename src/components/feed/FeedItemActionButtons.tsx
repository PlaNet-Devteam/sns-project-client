import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  BsBookmark,
  BsBookmarkFill,
  BsSuitHeart,
  BsSuitHeartFill,
} from 'react-icons/bs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BiComment, BiShare } from 'react-icons/bi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { FeedType } from '@/core';
import FeedService from '@/services/feed';
import {
  feedModalState,
  feedShareModalState,
  isFeedModalOpenState,
  isFeedShareModalOpenState,
} from '@/store/feedAtom';
import useAuth from '@/hooks/useAuth';
import useIsMobile from '@/hooks/useIsMobile';
import styles from './FeedItemActionButtons.module.scss';

interface FeedItemActionButtonsProps {
  item: FeedType;
}

const FeedItemActionButtons = ({ item }: FeedItemActionButtonsProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { payload } = useAuth();
  const [isClicked, setIsClicked] = useState(false);
  const feedModal = useRecoilValue(feedModalState);
  const isFeedModalOpen = useRecoilValue(isFeedModalOpenState);
  const setFeedShareModal = useSetRecoilState(feedShareModalState);
  const setIsFeedShareModalOpen = useSetRecoilState(isFeedShareModalOpenState);

  useEffect(() => {
    setIsClicked(false);
  }, []);

  const onSuccessInvalidateQueries = () => {
    if (isFeedModalOpen && feedModal) {
      queryClient.invalidateQueries(['feed-modal', feedModal.id]);
    } else if ((router.query.id as string) !== undefined) {
      queryClient.invalidateQueries(['feed-detail', String(item.id)]);
    } else {
      queryClient.invalidateQueries(['feeds']);
      queryClient.invalidateQueries(['newFeeds']);
    }
  };

  const likeFeedItemMutation = useMutation({
    mutationKey: ['like-feed', item.id],
    mutationFn: (feedId: number) => FeedService.likeFeed(feedId),
    onSuccess: () => {
      onSuccessInvalidateQueries();
    },
  });

  const deleteLikeFeedItemMutation = useMutation({
    mutationKey: ['delete-like-feed', item.id],
    mutationFn: (feedId: number) => FeedService.delteLikeFeed(feedId),
    onSuccess: () => {
      onSuccessInvalidateQueries();
    },
  });

  const bookmarkFeedItemMutation = useMutation({
    mutationKey: ['bookmark-feed', item.id],
    mutationFn: (feedId: number) => FeedService.bookmarkFeed(feedId),
    onSuccess: () => {
      onSuccessInvalidateQueries();
    },
  });

  const deleteBookmarkFeedItemMutation = useMutation({
    mutationKey: ['delete-bookmark-feed', item.id],
    mutationFn: (feedId: number) => FeedService.deleteBookmarkFeed(feedId),
    onSuccess: () => {
      onSuccessInvalidateQueries();
    },
  });

  const onClickFeedLkeHandler = (feedId: number) => {
    if (!payload) {
      alert('로그인이 필요합니다');
    } else {
      if (item.likedYn) {
        deleteLikeFeedItemMutation.mutate(feedId);
        setIsClicked(false);
      } else {
        likeFeedItemMutation.mutate(feedId);
        setIsClicked(true);
      }
    }
  };

  const onClickBookmarkHandler = (feedId: number) => {
    if (!payload) {
      alert('로그인이 필요합니다');
    } else {
      if (item.bookmarkedYn) {
        deleteBookmarkFeedItemMutation.mutate(feedId);
      } else {
        bookmarkFeedItemMutation.mutate(feedId);
      }
    }
  };

  const onClickCommentHandler = () => {
    if (!payload) {
      alert('로그인이 필요합니다');
    } else {
      router.push(`/feed/${item.id}/comment`);
    }
  };

  const isMobile = useIsMobile();

  const onClickShareHandler = () => {
    if (isMobile) {
      if (navigator.share) {
        navigator.share({
          title: `[PlaNet SNS] ${item.user.username} 님의 피드`,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}feed/${item.id}`,
        });
      } else {
        setFeedShareModal(item);
        setIsFeedShareModalOpen(true);
      }
    } else {
      setFeedShareModal(item);
      setIsFeedShareModalOpen(true);
    }
  };

  return (
    <>
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
          <button
            onClick={() => onClickCommentHandler()}
            className={styles.button}
          >
            <BiComment color="white" size={'1.5rem'} />
          </button>
          <button onClick={() => onClickShareHandler()}>
            <BiShare color="white" size={'1.5rem'} />
          </button>
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
    </>
  );
};

export default FeedItemActionButtons;
