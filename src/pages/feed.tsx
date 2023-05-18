import React from 'react';

export default function feed() {
  return (
    <>
      <title>feed</title>
      <div className="main_container">
        <div className="profile_container">
          <img src="/user.svg" alt="user" />
          <div className="profile_text">
            <div>정민상</div>
            <div className="upload_time">2분전</div>
          </div>
          <img src="/menu.svg" alt="menu" />
        </div>
        <div className="feed_text">오늘 바디프로필 찍었다. 질문받는다.</div>
        <img className="feed_image" src="/605991.jpg" alt="" />
        <div className="subscription_text_container">
          <div>좋아요 318개</div>
          <div>댓글 94개 공유 4회</div>
        </div>
        <div className="subscription_icon_container">
          <img className="subscription_icon" src="/thumbup.svg" alt="thumbup" />
          <img className="subscription_icon" src="/comment.svg" alt="comment" />
          <img className="subscription_icon" src="/share.svg" alt="share" />
        </div>
      </div>
    </>
  );
}
