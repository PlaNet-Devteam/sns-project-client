import React, { useState } from 'react';
import Link from 'next/link';
import { BsThreeDotsVertical } from 'react-icons/bs';
import router from 'next/router';
import { formattedDate } from '@/utils/formattedDate';
import { FeedType } from '@/core/types/feed';
import Carousel from '../feed/Carousel';
import UserProfileImage from '../common/UserProfileImage';

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
              <UserProfileImage
                username={item.user?.username}
                imagePath={item.user?.profileImage}
              />
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
