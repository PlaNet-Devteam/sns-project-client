import Comment from '@/components/comment/Comment';
import Header from '@/components/comment/Header';
import Input from '@/components/comment/Input';

export default function CommentPage() {
  return (
    <>
      <main>
        <Header></Header>
        <div className="comment__contatiner">
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
        </div>
        <Input></Input>
      </main>
    </>
  );
}
