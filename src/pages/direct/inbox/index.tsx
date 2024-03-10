import React from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { userState } from '@/store/userAtom';
import RoomService from '@/services/room';
import { RoomType } from '@/core/types/room';
import RoomListItem from '@/components/room/RoomListItem';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import EmptyRoom from '@/components/common/EmptyRoom';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const DirectInbox = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);

  const { data: rooms, isLoading } = useQuery<RoomType[]>(['allRoomss'], () =>
    RoomService.getRoomsByUser(),
  );

  const roomList = (
    <>
      {rooms && rooms.length > 0 ? (
        <>
          {rooms.map((room, index) => (
            <RoomListItem item={room} key={index} />
          ))}
        </>
      ) : (
        <>
          <EmptyRoom />
        </>
      )}
    </>
  );

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>{user?.username}</TopHeader.Title>
        <TopHeader.Right>
          <Link href={'/direct/new'}>추가</Link>
        </TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          {isLoading ? <LoadingSpinner variant="white" /> : roomList}
        </div>
      </article>
    </>
  );
};

export default DirectInbox;
