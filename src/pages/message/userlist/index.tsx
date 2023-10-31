import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserService from '@/services/user';
import Modal from '@/components/common/Modal';
import ProfileImage from '@/components/profile/ProfileImage';
import UserListHeader from '@/components/message/UserListHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const UserList = () => {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const { data: userlist, isLoading } = useQuery(['AllUser'], () =>
    UserService.findAllUserData(),
  );
  console.log(userlist);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <UserListHeader />
      <div className="userlist__title">친구 리스트</div>
      {userlist.map((userdata: any, index: any) => (
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
              <button className="profile__button">
                <Link
                  href={{
                    pathname: `/message/${userdata.username}`,
                    query: { username: userdata.username },
                  }}
                  as={userdata.username}
                >
                  DM 보내기
                </Link>
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
                src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${userdata?.profileImage}`}
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