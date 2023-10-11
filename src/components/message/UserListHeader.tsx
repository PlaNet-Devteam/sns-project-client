import Link from 'next/link';
import router from 'next/router';
import { AiFillPlusCircle, AiOutlineArrowLeft } from 'react-icons/ai';

const UserListHeader = () => {
  return (
    <>
      <div className="msg__header">
        <button className="msg__header-button" onClick={() => router.back()}>
          <AiOutlineArrowLeft className="msg__header-icons" />
        </button>
        <div className="msg__header-username">메시지 추가하기</div>
        <button className="msg__header-button"></button>
      </div>
    </>
  );
};
export default UserListHeader;
