import Link from 'next/link';
import router from 'next/router';
import { AiFillPlusCircle, AiOutlineArrowLeft } from 'react-icons/ai';

interface UsernameProps {
  username: string | string[] | undefined;
}

const MsgHeader = ({ username }: UsernameProps) => {
  return (
    <>
      <div className="msg__header">
        <button className="msg__header-button" onClick={() => router.back()}>
          <AiOutlineArrowLeft className="msg__header-icons" />
        </button>
        <div className="msg__header-username">{username}</div>
        <button className="msg__header-button">
          <Link href={'/message/userlist'}>
            <AiFillPlusCircle className="msg__header-icons" />
          </Link>
        </button>
      </div>
    </>
  );
};
export default MsgHeader;
