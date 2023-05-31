import axios from 'axios';
import { useRecoilValue } from 'recoil';
import Comment from '@/components/comment/Comment';
import Header from '@/components/comment/Header';
import Input from '@/components/comment/Input';
import { CommentsType, CommentType } from '@/core/types/comment/index';
import { commentState } from '../../store/commentAtom';

export default function CommentPage({ comment }: CommentsType) {
  const comments = useRecoilValue(commentState);

  return (
    <>
      <main>
        <Header></Header>
        <div className="comment__contatiner">
          {/* {comment.map((comment) => {
            return <Comment comment={comment}></Comment>;
          })} */}
          {comments.map((comment: CommentType) => {
            return <Comment key={comment.id} comment={comment}></Comment>;
          })}
        </div>
      </main>
      <Input></Input>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`https://example.com/comment/1`);
  const comment = res.data.comment;

  return { props: { comment } };
}
