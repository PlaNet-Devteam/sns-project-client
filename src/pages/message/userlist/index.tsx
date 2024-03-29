import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import io from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { userState } from '@/store/userAtom';
import UserService from '@/services/user';
import Modal from '@/components/common/Modal';
import ProfileImage from '@/components/profile/ProfileImage';
import UserListHeader from '@/components/message/UserListHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import BaseImage from '@/components/common/img/BaseImage';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

interface UserData {
  profileImage?: string;
  nickname: string;
  bio: string;
  username: string;
  id: number;
}

const UserList = () => {
  const router = useRouter();
  const [openModalIndex, setOpenModalIndex] = useState(0);
  const user = useRecoilValue(userState);
  const { data: userlist, isLoading } = useQuery(['AllUser'], () =>
    UserService.findAllUserData(),
  );

  socket.on('create_room', (data: string) => {
    router.push(`/message/${data}`);
  });
  const myId = user?.id;
  const handleLinkDMpage = (otherUserId: number) => {
    socket.emit('create_room', { myId, otherUserId });
  };

  if (isLoading) {
    return <LoadingSpinner variant="white" />;
  }
  return (
    <div>
      <UserListHeader />
      <div className="userlist__title">친구 리스트</div>
      {userlist.map((userdata: UserData, index: number) => (
        <div key={index} className="userlist">
          <Modal
            headerText={userdata.username}
            isModalOpen={openModalIndex === index}
            onClickCloseModal={() => {
              setOpenModalIndex(0);
            }}
          >
            <ProfileImage profile={userlist} />
            <div className="prfile__container">
              <button
                className="profile__button"
                onClick={() => handleLinkDMpage(userdata.id)}
              >
                DM 보내기
              </button>
              <button className="profile__button">
                <Link href={`/${userdata.username}`}>프로필 보기</Link>
              </button>
            </div>
          </Modal>
          <div
            className="userdata"
            onClick={() => {
              setOpenModalIndex(index);
            }}
          >
            {userdata?.profileImage && (
              <BaseImage
                className="userdata__icon"
                src={userdata?.profileImage}
                width={100}
                height={100}
                alt={`${userdata?.nickname}님의 프로필 이미지`}
              />
            )}
            <div className="userInfo">
              <div>{userdata.nickname}</div>
              <div className="userInfo__contents">{userdata.bio}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['AllUser'], async () => {
    return await UserService.findAllUserData();
  });
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default UserList;
