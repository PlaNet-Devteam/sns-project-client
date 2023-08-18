import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Comments = () => {
  const [replyComment, setReplyComment] = useState(false);
  const [thumbupState, setThumbupState] = useState(false);
  const router = useRouter();
  return (
    <>
      <title>댓글 페이지</title>
      <div className="main_container">
        <div className="comment_header">
          <div onClick={() => router.back()}>뒤로</div>
          <div>댓글</div>
          <div>공유</div>
        </div>
        <div className="feed_container">
          <div className="comment_container">
            <div className="comment_body_container">
              <img src="/user.svg" alt="user" />
              <div className="comment_profile_container">
                <div className="comment_user_name">이민형</div>
                <div className="comment_text">한컷에 얼마인가요?</div>
                <div className="comment_subscription_container">
                  <div>좋아요 1개</div>
                  <div>답글 1개</div>
                  <button onClick={() => setReplyComment(!replyComment)}>
                    더보기
                  </button>
                </div>
              </div>
              {thumbupState ? (
                <img
                  src="/yes_rocket.svg"
                  alt="thumbup"
                  onClick={() => setThumbupState(!thumbupState)}
                />
              ) : (
                <img
                  src="/no_rocket.svg"
                  alt="thumbup"
                  onClick={() => setThumbupState(!thumbupState)}
                />
              )}
            </div>
            {replyComment && (
              <div className="replycomment_body_container">
                <img
                  className="replycomment_user_icon"
                  src="/user.svg"
                  alt="user"
                />
                <div className="comment_profile_container">
                  <div className="comment_user_name">정민상</div>
                  <div className="comment_text">어제 시작했습니다.</div>
                  <div className="comment_subscription_container">
                    <div>좋아요 0개</div>
                    <div>답글 0개</div>
                  </div>
                </div>
                <img
                  className="replycomment_thumbup"
                  src="/no_rocket.svg"
                  alt="thumbup"
                />
              </div>
            )}
            <div className="comment_body_container">
              <img src="/user.svg" alt="user" />
              <div className="comment_profile_container">
                <div className="comment_user_name">이민형</div>
                <div className="comment_text">운동은 얼마나 하셨나요?</div>
                <div className="comment_subscription_container">
                  <div>좋아요 1개</div>
                  <div>답글 0개</div>
                </div>
              </div>
              <img src="/no_rocket.svg" alt="thumbup" />
            </div>
            <div className="comment_body_container">
              <img src="/user.svg" alt="user" />
              <div className="comment_profile_container">
                <div className="comment_user_name">김보라</div>
                <div className="comment_text">오우 너무 별로예요</div>
                <div className="comment_subscription_container">
                  <div>좋아요 999개</div>
                  <div>답글 999개</div>
                  <button>더보기</button>
                </div>
              </div>
              <img src="/no_rocket.svg" alt="thumbup" />
            </div>
            <div className="comment_body_container">
              <img src="/user.svg" alt="user" />
              <div className="comment_profile_container">
                <div className="comment_user_name">강명주</div>
                <div className="comment_text">구라치지 마세요</div>
                <div className="comment_subscription_container">
                  <div>좋아요 999개</div>
                  <div>답글 999개</div>
                  <button>더보기</button>
                </div>
              </div>
              <img src="/no_rocket.svg" alt="thumbup" />
            </div>
            <div className="comment_body_container">
              <img src="/user.svg" alt="user" />
              <div className="comment_profile_container">
                <div className="comment_user_name">김코딩</div>
                <div className="comment_text">
                  자바스크립트는 얼마나 공부하셨나요?
                </div>
                <div className="comment_subscription_container">
                  <div>좋아요 0개</div>
                  <div>답글 0개</div>
                </div>
              </div>
              <img src="/no_rocket.svg" alt="thumbup" />
            </div>
          </div>
        </div>
        <div className="comment_submit_container">
          <button className="comment_hide_button">🔽</button>
          <div className="comment_submit">
            <img src="/user.svg" alt="user" />
            <input placeholder="댓글 추가" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Comments;
