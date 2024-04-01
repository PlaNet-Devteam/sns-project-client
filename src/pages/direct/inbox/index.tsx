import React from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FaPaperPlane } from 'react-icons/fa';
import { userState } from '@/store/userAtom';
import RoomService from '@/services/room';
import { RoomType } from '@/core/types/room';
import RoomListItem from '@/components/room/RoomListItem';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import EmptyRoom from '@/components/common/EmptyRoom';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TypoText from '@/components/common/TypoText';
import ButtonGroup from '@/components/common/ButtonGroup';
import Button from '@/components/common/Button';

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
          {rooms.map((room) => (
            <RoomListItem item={room} key={room.roomUniqueId} />
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
          {process.env.NODE_ENV !== 'production' && (
            <Link href={'/direct/new'}>추가</Link>
          )}
        </TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          {process.env.NODE_ENV !== 'production' ? (
            <>{isLoading ? <LoadingSpinner variant="white" /> : roomList}</>
          ) : (
            <div className="empty-data">
              <div>
                <div className="row-box">
                  <FaPaperPlane color="white" size={'3rem'} />
                  <div className="row-box">
                    <TypoText color="white" tagName="h3">
                      준비중
                    </TypoText>
                  </div>
                </div>
                <ButtonGroup>
                  <Button variant="primary" size="sm" to={'/feed'}>
                    피드로 돌아가기
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default DirectInbox;
