import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { FeedType } from '@/core/types/feed';
import FeedImg from '@/components/feed/FeedImg';
import FeedService from '@/services/feed';
import { userState } from '@/store/userAtom';
import { UserType } from '@/core';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Dialog from '../dialog/Dialog';
import LoadingSpinner from '../common/LoadingSpinner';
import Modal from '../common/Modal';
import FeedImgModal from './FeedImgModal';

interface FeedItemProps {
  item: FeedType;
}

const FeedItem = ({ item }: FeedItemProps) => {
  const queryClient = useQueryClient(); // TODO: 체크
  const user = useRecoilValue<UserType | null>(userState);
  const [username, _] = useLocalStorage('username', user?.username);

  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${item.user?.profileImage}`,
  );
  const [scrollY, setScrollY] = useLocalStorage('scroll_location', 0);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const router = useRouter();
  const handlecommentbutton = () => {
    router.push(`/comment/${item.id}`);
    console.log(scrollY);
  };

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
              <Link href={`/${item.user?.username}`}>
                {item.user?.profileImage ? (
                  <Image
                    src={imgSrc}
                    width={100}
                    height={100}
                    alt={`${item.user?.nickname}님의 프로필 이미지`}
                    onError={() => {
                      setImgSrc('/img/icons/icon_default_profile.svg');
                    }}
                  />
                ) : (
                  <Image
                    src={'/img/icons/icon_default_profile.svg'}
                    width={100}
                    height={100}
                    alt="프로필 이미지"
                  />
                )}
              </Link>
            </figure>
            <div className="profile_info">
              <div className="profile_text">
                <div>
                  <Link href={`/${item.user?.username}`}>
                    {item.user?.nickname}
                  </Link>
                </div>
                <div className="upload_time">
                  {item.updatedAt || item.createdAt}
                </div>
              </div>
              <BsThreeDotsVertical onClick={handleModalOpen} />
            </div>
          </div>
          <div className="feed_text">{item.description}</div>
          <Modal
            headerText={item.user?.nickname}
            isModalOpen={isImgModalOpen}
            onClickCloseModal={() => {
              setIsImgModalOpen(false);
            }}
          >
            <FeedImgModal feedImage={item.feedImages} />
          </Modal>
          <div
            onClick={() => {
              setIsImgModalOpen(true);
            }}
          >
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
          <img className="subscription_icon" src="/thumbup.svg" alt="thumbup" />
          <button className="subscription_icon">
            <img
              src="/comment.svg"
              alt="comment"
              onClick={handlecommentbutton}
            />
          </button>
          <img className="subscription_icon" src="/share.svg" alt="share" />
        </div>
      </div>
      <Dialog isOpen={isModalOpen}>
        <Dialog.Dimmed onClick={handleModalOpen} />
        {item.user.username === username && (
          <Dialog.LabelButton color="white">수정</Dialog.LabelButton>
        )}
        {item.user.username === username && (
          <Dialog.LabelButton
            color="danger"
            onClick={() => handleDeleteFeedItem(item.id)}
          >
            삭제
          </Dialog.LabelButton>
        )}
        {item.user.username !== username && (
          <Dialog.LabelButton color="danger">신고</Dialog.LabelButton>
        )}
      </Dialog>
      {/* {deleteFeedItemMutation.isLoading && <LoadingSpinner />} */}
    </>
  );
};
export default FeedItem;
