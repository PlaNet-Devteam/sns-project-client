import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import RoomService from '@/services/room';
import { RoomType } from '@/core/types/room';
import useAuth from '@/hooks/useAuth';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import DirectMessageList from '@/components/direct-message/DirectMessageList';

const DirectMessage = () => {
  const router = useRouter();
  const { payload } = useAuth();
  const roomId = router.query.roomUniqueId as string;
  const { data: room } = useQuery<RoomType>(['room', roomId], () =>
    RoomService.getRoomByRoomUniqueId(router.query.roomUniqueId as string),
  );

  const roomUsers = room?.users
    .filter((user) => user.id != payload?._id)
    .map((user) => user.username)
    .join(', ');

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.push('/direct/inbox')}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>{roomUsers}</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      {roomId && <DirectMessageList roomId={roomId} />}
    </>
  );
};

export default DirectMessage;
