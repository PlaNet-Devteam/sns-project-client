import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  BsBookmark,
  BsBookmarkFill,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import { FeedType } from '@/core/types/feed';
import FeedImg from '@/components/feed/FeedImg';
import FeedService from '@/services/feed';
import { formattedDate } from '@/utils/formattedDate';
import useAuth from '@/hooks/useAuth';
import { feedState } from '@/store/feedAtom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Dialog from '../dialog/Dialog';
// import LoadingLayer from '../common/LoadingLayer';
import FeedModal from '../common/FeedModal';
import UserProfileImage from '../common/UserProfileImage';
import Carousel from './Carousel';

interface FeedItemProps {
  item: FeedType;
}

const FeedItem = ({ item }: FeedItemProps) => {
  const queryClient = useQueryClient(); // TODO: 체크
  const { payload } = useAuth();
  const setFeedModifyState = useSetRecoilState(feedState);

  const setScrollY = useLocalStorage('scroll_location', 0)[1];
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const deleteFeedItemMutation = useMutation({
    mutationKey: ['delete-feed', item.id],
    mutationFn: (feedId: number) => FeedService.deleteFeed(feedId),
    onSuccess: () => {
      setIsModalOpen(false);
      return queryClient.invalidateQueries(['feeds']);
    },
  });

  const handleDeleteFeedItem = async (feedId: number) => {
    deleteFeedItemMutation.mutate(feedId);
  };

  const handleModifyFeedItem = async (item: FeedType) => {
    setFeedModifyState(item);
    router.replace('/feed/modify');
  };

  const openModalIfImgCnt = () => {
    if (item.feedImages) {
      item.feedImages.length > 1 ? setIsImgModalOpen(true) : null;
    }
  };

  const convertedDate = formattedDate()(item.updatedAt || item.createdAt);

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
    } else {
      likeFeedItemMutation.mutate(feedId);
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
    <>
      <div
        id={String(item.id)}
        className="feed-item_container"
        onClick={() => setScrollY(window.scrollY)}
      >
        <div>
          <div className="profile_container">
            <figure>
              <UserProfileImage
                username={item.user.username}
                imagePath={item.user.profileImage}
              />
            </figure>
            <div className="profile_info">
              <div className="profile_text">
                <div>
                  <Link href={`/${item.user?.username}`}>
                    {item.user?.nickname}
                  </Link>
                </div>
                <div className="upload_time">{convertedDate}</div>
              </div>
              <BsThreeDotsVertical onClick={handleModalOpen} />
            </div>
          </div>
          <div className="feed_text">{item.description}</div>
          <FeedModal
            modalPurpose="Img"
            isModalOpen={isImgModalOpen}
            onClickCloseModal={() => {
              setIsImgModalOpen(false);
            }}
          >
            {item.feedImages && <Carousel feedImages={item.feedImages} />}
          </FeedModal>
          <div onClick={openModalIfImgCnt}>
            {item.feedImages && item.feedImages.length > 0 && (
              <FeedImg feedImages={item.feedImages} />
            )}
          </div>
          <div className="subscription_text_container">
            <div>좋아요 {item.likeCount}개</div>
            <div>댓글 {item.commentCount}개 공유 0회</div>
          </div>
        </div>
        <div className="subscription_icon_container">
          <button
            className="subscription_icon"
            onClick={() => onClickFeedLkeHandler(item.id)}
          >
            {item.likedYn ? (
              <AiFillLike color="white" size={'1.5rem'} />
            ) : (
              <AiOutlineLike color="white" size={'1.5rem'} />
            )}
          </button>
          <Link href={`/feed/${item.id}/comment`} className="subscription_icon">
            <img src="/comment.svg" alt="comment" />
          </Link>
          <button
            className="subscription_icon"
            onClick={() => onClickBookmarkHandler(item.id)}
          >
            {item.bookmarkedYn ? (
              <BsBookmarkFill color="whtie" size={'1.5rem'} />
            ) : (
              <BsBookmark color="white" size={'1.5rem'} />
            )}
          </button>
        </div>
      </div>
      <Dialog isOpen={isModalOpen}>
        <Dialog.Dimmed onClick={handleModalOpen} />
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="white"
            onClick={() => handleModifyFeedItem(item)}
          >
            수정
          </Dialog.LabelButton>
        )}
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="danger"
            onClick={() => handleDeleteFeedItem(item.id)}
          >
            삭제
          </Dialog.LabelButton>
        )}
        {item.user.username !== payload?.username && (
          <Dialog.LabelButton color="danger">신고</Dialog.LabelButton>
        )}
      </Dialog>
      {/* {deleteFeedItemMutation.isLoading && <LoadingLayer />} */}
    </>
  );
};
export default FeedItem;
