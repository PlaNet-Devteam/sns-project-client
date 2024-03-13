import router from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

interface UsernameProps {
  username: string | string[] | undefined;
}

const ChatHeader = ({ username }: UsernameProps) => {
  return (
    <>
      <div className="chat__header">
        <button className="chat__header-button" onClick={() => router.back()}>
          <AiOutlineArrowLeft className="chat__header-icons" />
        </button>
        <div className="chat__header-username">{username}</div>
        <button className="chat__header-button">
          <GiHamburgerMenu className="chat__header-icons" />
        </button>
      </div>
    </>
  );
};
export default ChatHeader;
