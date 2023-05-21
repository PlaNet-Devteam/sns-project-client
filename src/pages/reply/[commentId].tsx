import Reply from '@/components/reply/Reply';
import Header from '@/components/reply/Header';
import Input from '@/components/reply/Input';

export default function ReplyPage() {
  return (
    <>
      <main>
        <Header></Header>
        <div className="reply__contatiner">
          <Reply></Reply>
          <Reply></Reply>
          <Reply></Reply>
          <Reply></Reply>
          <Reply></Reply>
          <Reply></Reply>
          <Reply></Reply>
          <Reply></Reply>
          <Reply></Reply>
          <Reply></Reply>
          <Reply></Reply>
        </div>
        <Input></Input>
      </main>
    </>
  );
}
