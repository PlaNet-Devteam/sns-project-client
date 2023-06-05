import React from 'react';
import { useRouter } from 'next/router';
import FeedImg from './FeedImg';

interface FeedType {
  id: string;
  description: string;
  likeCount: number;
  commentCount: number;
  feedImage: [
    {
      feedId: number;
      sortOrder: number;
      image: string;
    },
  ];
}

function FeedItem({
  id,
  description,
  likeCount,
  commentCount,
  feedImage,
}: FeedType) {
  const router = useRouter();
  const handlecommentbutton = () => {
    router.push(`/feed/${id}`);
  };
  return (
    <div className="feed_container">
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
}
export default FeedItem;
