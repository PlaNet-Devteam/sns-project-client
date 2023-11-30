import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import io from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { userState } from '@/store/userAtom';
import UserService from '@/services/user';
import Modal from '@/components/common/Modal';
import ProfileImage from '@/components/profile/ProfileImage';
import UserListHeader from '@/components/message/UserListHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import isExternalImage from '@/core/utils/is-external-image';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

interface UserData {
  profileImage?: string;
  nickname: string;
  bio: string;
  username: string;
}

const UserList = () => {
  const router = useRouter();
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const user = useRecoilValue(userState);
  const { data: userlist, isLoading } = useQuery(['AllUser'], () =>
    UserService.findAllUserData(),
  );

  socket.on('create_room', (data: string) => {
    console.log(data);
    router.push(`/message/${data}`);
  });
  const myName = user?.username;
  const handleLinkDMpage = (otherUserName: string) => {
    socket.emit('create_room', { myName, otherUserName });
  };

  if (isLoading) {
    return <LoadingSpinner variant="white" />;
  }
  return (
    <div>
      <UserListHeader />
      <div className="userlist__title">친구 리스트</div>
      {userlist.map((userdata: UserData, index: any) => (
        <div key={index} className="userlist">
          <Modal
            headerText={userdata.username}
            isModalOpen={openModalIndex === index}
            onClickCloseModal={() => {
              setOpenModalIndex(null);
            }}
          >
            <ProfileImage profile={userlist} />
            <div className="prfile__container">
              <button
                className="profile__button"
                onClick={() => handleLinkDMpage(userdata.username)}
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
            {userdata?.profileImage ? (
              <Image
                className="userdata__icon"
                src={
                  isExternalImage(userdata?.profileImage)
                    ? userdata?.profileImage
                    : `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${userdata?.profileImage}`
                }
                width={100}
                height={100}
                alt={`${userdata?.nickname}님의 프로필 이미지`}
              />
            ) : (
              <Image
                className="userdata__icon"
                src={'/img/icons/icon_default_profile.svg'}
                width={100}
                height={100}
                alt="프로필 이미지"
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
