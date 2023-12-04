import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';
import MsgHeader from '@/components/message/MsgListHeader';
import { userState } from '@/store/userAtom';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

interface roomListProps {
  user1: string | undefined;
  user2: string | undefined;
  roomId: string;
  user1Name: string;
  user2Name: string;
}

const MessageList = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [roomList, setRoomList] = useState<roomListProps[]>([]);

  const handleLinkDMpage = (roomId: string) => {
    router.push(`/message/${roomId}`);
  };

  useEffect(() => {
    socket.emit('get_room_list');
    socket.on('get_room_list', (data: roomListProps[]) => {
      setRoomList(data);
    });
  }, []);
  return (
    <div className="msglist__container">
      <MsgHeader username={user?.username} />
      <div className="msglist">
        {roomList ? (
          roomList.map((list) => (
            <div
              className="valid__chatroom"
              onClick={() => handleLinkDMpage(list.roomId)}
            >
              {user?.id === list.user1 ? list.user2Name : list.user1Name}
            </div>
          ))
        ) : (
          <div className="none__chatroom">채팅방이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
