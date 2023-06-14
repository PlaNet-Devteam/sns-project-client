import React from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from 'use-local-storage';
import FeedImg from '@/components/feed/FeedImg';
import { FeedImageType } from '@/core/types/feed';

interface FeedType {
  id: string;
  description: string;
  likeCount: number;
  commentCount: number;
  feedImage: FeedImageType[];
}

const FeedItem = ({
  id,
  description,
  likeCount,
  commentCount,
  feedImage,
}: FeedType) => {
  const [scrollY, setScrollY] = useLocalStorage('scroll_location', 0);
  const router = useRouter();
  const handlecommentbutton = () => {
    router.push(`/comment/${id}`);
  };
  return (
    <div
      className="feed-item_container"
      onClick={() => setScrollY(window.scrollY)}
    >
      <div className="profile_container">
        <img src="/user.svg" alt="user" />
        <div className="profile_text">
          <div>김코딩</div>
          <div className="upload_time">2분전</div>
        </div>
        <img src="/menu.svg" alt="menu" />
      </div>
      <div className="feed_text">{description}</div>
      <FeedImg feedImage={feedImage} />
      <div className="subscription_text_container">
        <div>좋아요 {likeCount}개</div>
        <div>댓글 {commentCount}개 공유 0회</div>
      </div>
      <div className="subscription_icon_container">
        <img className="subscription_icon" src="/thumbup.svg" alt="thumbup" />
        <button className="subscription_icon">
          <img src="/comment.svg" alt="comment" onClick={handlecommentbutton} />
        </button>
        <img className="subscription_icon" src="/share.svg" alt="share" />
      </div>
    </div>
  );
};
export default FeedItem;
