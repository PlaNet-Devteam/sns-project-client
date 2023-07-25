import React from 'react';
import { useRouter } from 'next/router';
import FeedImg from '@/components/feed/FeedImg';
import { FeedType } from '@/core/types/feed';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface FeedItemProps {
  item: FeedType;
}

const FeedItem = ({ item }: FeedItemProps) => {
  const [scrollY, setScrollY] = useLocalStorage('scroll_location', 0);
  const router = useRouter();
  const handlecommentbutton = () => {
    router.push(`/comment/${item.id}`);
    console.log(scrollY);
  };
  return (
    <div
      className="feed-item_container"
      onClick={() => setScrollY(window.scrollY)}
    >
      <div className="profile_container">
        <img src="/user.svg" alt="user" />
        <div className="profile_text">
          <div>{item.user?.nickname}</div>
          <div className="upload_time">{item.updatedAt || item.createdAt}</div>
        </div>
        <img src="/menu.svg" alt="menu" />
      </div>
      <div className="feed_text">{item.description}</div>
      {item.feedImages && <FeedImg feedImages={item.feedImages} />}
      <div className="subscription_text_container">
        <div>좋아요 {item.likeCount}개</div>
        <div>댓글 {item.commentCount}개 공유 0회</div>
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
