import { useRouter } from 'next/router';
import { ImSpinner6 } from 'react-icons/im';
import CommentItem from '@/components/comment/CommentItem';
import CommentInput from '@/components/comment/CommentInput';
import { CommentType } from '@/core/types/comment/index';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import CommentService from '@/services/comment';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';

export default function CommentPage() {
  const router = useRouter();

  const {
    data: comments,
    isFetchingNextPage,
    status,
    bottom,
  } = useInfinityScroll(`feed-${router.query.feedId}-comments`, (page) =>
    CommentService.getComments(parseInt(router.query.feedId as string), {
      page,
      limit: 10,
    }),
  );

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>댓글</TopHeader.Title>
        <TopHeader.Right>공유</TopHeader.Right>
      </TopHeader>
      <div className="comment__contatiner">
        <div className="comment__list">
          {comments &&
            comments.pages?.map((page, index) => (
              <div key={index}>
                {page.items.map((comment: CommentType) => (
                  <CommentItem key={comment.id} item={comment} />
                ))}
              </div>
            ))}
          {bottom && <div ref={bottom} />}
          <div className="spinner_container">
            {status === 'success' && isFetchingNextPage ? (
              <ImSpinner6 className="spinner" />
            ) : null}
          </div>
        </div>
        <CommentInput />
      </div>
    </>
  );
}
