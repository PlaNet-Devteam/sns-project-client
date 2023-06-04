import { useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Comment from '@/components/comment/Comment';
import Header from '@/components/comment/Header';
import Input from '@/components/comment/Input';
import { CommentType } from '@/core/types/comment/index';
import { commentState } from '../../store/commentAtom';
import { getComments } from '../../utils/api';

export default function CommentPage() {
  const { data } = useQuery(['comments'], getComments);
  console.log(data?.data.data);
  const comment = data?.data?.comment;
  const setComments = useSetRecoilState(commentState);
  const comments = useRecoilValue(commentState);
  useEffect(() => {
    setComments(comment as any);
  }, [comment]);

  return (
    <>
      <main>
        <Header></Header>
        <div className="comment__contatiner">
          {comments?.map((comment: CommentType) => {
            return <Comment key={comment.id} comment={comment}></Comment>;
          })}
        </div>
      </main>
      <Input></Input>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery(['comments'], getComments);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
