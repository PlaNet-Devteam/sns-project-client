import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FeedType } from '@/core/types/feed';
import FeedImg from '@/components/feed/FeedImg';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface FeedItemProps {
  item: FeedType;
}

const FeedItem = ({ item }: FeedItemProps) => {
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${item.user?.profileImage}`,
  );
  const [scrollY, setScrollY] = useLocalStorage('scroll_location', 0);
  const router = useRouter();
  const handlecommentbutton = () => {
    router.push(`/comment/${item.id}`);
    console.log(scrollY);
  };
  return (
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
            {/* <img src="/menu.svg" alt="menu" /> */}
          </div>
        </div>
        <div className="feed_text">{item.description}</div>
        {item.feedImages && item.feedImages.length > 0 && (
          <FeedImg feedImages={item.feedImages} />
        )}
        <div className="subscription_text_container">
          <div>좋아요 {item.likeCount}개</div>
          <div>댓글 {item.commentCount}개 공유 0회</div>
        </div>
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
