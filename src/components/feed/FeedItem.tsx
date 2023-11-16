import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FeedType } from '@/core/types/feed';
import FeedService from '@/services/feed';
import useAuth from '@/hooks/useAuth';
import {
  feedModalState,
  feedState,
  isFeedModalOpenState,
} from '@/store/feedAtom';
import { FEED_STATUS, YN } from '@/core';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Dialog from '../dialog/Dialog';
import LoadingSpinner from '../common/LoadingSpinner';
import FeedItemProfileInfo from './FeedItemProfileInfo';
import FeedItemImageCarousel from './FeedItemImageCarousel';
import FeedItemDetailContent from './FeedItemDetailContent';
import styles from './FeedItem.module.scss';

interface FeedItemProps {
  item: FeedType;
}

const FeedItem = ({ item }: FeedItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { payload } = useAuth();

  const setFeedModifyState = useSetRecoilState(feedState);
  const setScrollY = useLocalStorage('scroll_location', 0)[1];
  const feedModal = useRecoilValue(feedModalState);
  const [isFeedModalOpen, setIsFeedModalOpen] =
    useRecoilState(isFeedModalOpenState);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onInvalidateAndClaoseFeedModalHandler = () => {
    // * 쿼리별 피드 목록 갱신
    if (isFeedModalOpen && feedModal) {
      queryClient.invalidateQueries([...feedModal.queryKey]);
    }
    // * 본인 프로필 페이지 정보 갱신
    if (router.query.username === payload?.username) {
      queryClient.invalidateQueries(['user', payload?.username]);
    }
    setIsFeedModalOpen(false);
  };

  const onInvalidateAndCloseDialogHandler = () => {
    // * 피드 모달 OPEN 상태 일경우
    if (isFeedModalOpen && feedModal) {
      queryClient.invalidateQueries(['feed-modal', feedModal.id]);
    } else {
      queryClient.invalidateQueries(['feeds']);
    }
    setIsDialogOpen(false);
  };

  const {
    mutateAsync: deleteFeedItemMutation,
    isLoading: isLoadingDeleteFeed,
  } = useMutation({
    mutationKey: ['delete-feed', item.id],
    mutationFn: (feedId: number) => FeedService.deleteFeed(feedId),
    onSuccess: () => {
      onInvalidateAndCloseDialogHandler();
      onInvalidateAndClaoseFeedModalHandler();
    },
  });

  const {
    mutateAsync: updateShowLikeCountYnMutation,
    isLoading: isLoadingShowLikeCountYn,
  } = useMutation({
    mutationKey: ['update-feed-show-like-count-yn', item.id],
    mutationFn: (feedId: number) => {
      if (item.showLikeCountYn === YN.Y) {
        return FeedService.updateShowLikeCount(feedId, {
          showLikeCountYn: YN.N,
        });
      } else {
        return FeedService.updateShowLikeCount(feedId, {
          showLikeCountYn: YN.Y,
        });
      }
    },
    onSuccess: () => {
      onInvalidateAndCloseDialogHandler();
    },
  });

  const {
    mutateAsync: updateStatusArchivedMutation,
    isLoading: isLoadingStatusArchived,
  } = useMutation({
    mutationKey: ['update-feed-status', item.id],
    mutationFn: (feedId: number) => {
      if (item.status === FEED_STATUS.ACTIVE) {
        return FeedService.updateFeedStatus(feedId, {
          status: FEED_STATUS.ARCHIVED,
        });
      } else {
        return FeedService.updateFeedStatus(feedId, {
          status: FEED_STATUS.ACTIVE,
        });
      }
    },
    onSuccess: () => {
      onInvalidateAndCloseDialogHandler();
      onInvalidateAndClaoseFeedModalHandler();
    },
  });

  const handleDeleteFeedItem = async (feedId: number) => {
    deleteFeedItemMutation(feedId);
  };

  const handleModifyFeedItem = async (item: FeedType) => {
    setFeedModifyState(item);
    router.push('/feed/modify');
  };

  const onClickShowLikeCountHandler = (feedId: number) => {
    updateShowLikeCountYnMutation(feedId);
  };

  const onClickStatusArchivedHandler = (feedId: number) => {
    updateStatusArchivedMutation(feedId);
  };

  return (
    <>
      <div
        id={String(item.id)}
        className={styles.item}
        onClick={() => setScrollY(window.scrollY)}
      >
        <FeedItemProfileInfo
          item={item}
          onClickOptions={() => setIsDialogOpen(true)}
        />
        <FeedItemImageCarousel feedImages={item.feedImages} />
        <FeedItemDetailContent item={item} />
      </div>
      <Dialog isOpen={isDialogOpen}>
        <Dialog.Dimmed onClick={() => setIsDialogOpen(false)} />
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="essential"
            onClick={() => handleModifyFeedItem(item)}
          >
            수정
          </Dialog.LabelButton>
        )}
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="white"
            onClick={() => onClickStatusArchivedHandler(item.id)}
          >
            {isLoadingStatusArchived ? (
              <LoadingSpinner variant="white" />
            ) : (
              <>{item.status === FEED_STATUS.ARCHIVED ? '보관 해제' : '보관'}</>
            )}
          </Dialog.LabelButton>
        )}
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="white"
            onClick={() => onClickShowLikeCountHandler(item.id)}
          >
            {isLoadingShowLikeCountYn ? (
              <LoadingSpinner variant="white" />
            ) : (
              <>
                좋아요 수 {item.showLikeCountYn === YN.Y ? '숨기기' : '보이기'}
              </>
            )}
          </Dialog.LabelButton>
        )}
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="danger"
            onClick={() => handleDeleteFeedItem(item.id)}
          >
            {isLoadingDeleteFeed ? (
              <LoadingSpinner variant="white" />
            ) : (
              <>삭제</>
            )}
          </Dialog.LabelButton>
        )}
        {item.user.username !== payload?.username && (
          <Dialog.LabelButton color="danger">신고</Dialog.LabelButton>
        )}
      </Dialog>
    </>
  );
};
export default FeedItem;
