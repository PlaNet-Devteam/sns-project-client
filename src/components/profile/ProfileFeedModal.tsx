import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsThreeDotsVertical } from 'react-icons/bs';
import router from 'next/router';
import { formattedDate } from '@/utils/formattedDate';
import { FeedType } from '@/core/types/feed';
import Carousel from '../feed/Carousel';

interface ProfileFeedModalProps {
  item: FeedType;
}

const ProfileFeedModal = ({ item }: ProfileFeedModalProps) => {
  const setIsModalOpen = useState(false)[1];
  const handleModalOpen = () => {
    setIsModalOpen((prevState) => !prevState);
  };
  const handlecommentbutton = () => {
    router.push(`/comment/${item.id}`);
  };

  const convertedDate = formattedDate()(item.updatedAt || item.createdAt);

  return (
    <>
      <div className="feed-modal_container">
        <div style={{ padding: '0px' }}>
          <div className="modal-profile_container">
            <figure>
              <Link href={`/${item.user?.username}`}>
                {item.user?.profileImage ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${item.user?.profileImage}`}
                    width={100}
                    height={100}
                    alt={`${item.user?.nickname}님의 프로필 이미지`}
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
                  <div>{item.user?.nickname}</div>
                </div>
                <div className="upload_time">{convertedDate}</div>
              </div>
              <BsThreeDotsVertical onClick={handleModalOpen} />
            </div>
          </div>
          <div className="profile-feed-modal_text">{item.description}</div>
          {item.feedImages && <Carousel feedImages={item.feedImages} />}
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
    </>
  );
};
export default ProfileFeedModal;
