import React from 'react';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { AiFillPlusSquare } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { userState } from '@/store/userAtom';
import ChatHeader from '@/components/message/ChatHeader';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
console.log(socket);

interface ChatUserGatewayType {
  userId: number;
  message?: string;
}

const Message = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<ChatUserGatewayType[]>([]);

  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    socket.on('message', (data: ChatUserGatewayType) => {
      console.log(data);
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  const handleSend = () => {
    socket.emit('message', {
      roomId: router.query.roomId,
      userId: user?.id,
      message,
    });
    setMessage('');
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket server connected.');
    });
    socket.on('disconnect', () => {
      console.log('socket server disconnected.');
    });
  }, []);

  useEffect(() => {
    socket.emit('join_room', {
      roomId: router.query.roomId,
    });
    socket.on('join_room', (data: string) => {
      console.log('data', data);
    });
  }, [router.query.roomId]);

  return (
    <div className="chat__container">
      <ChatHeader username={router.query.roomId} />
      <div className="message__container">
        <ul className="message__contents">
          {messageList.map((message: ChatUserGatewayType, index: number) => (
            <li
              className={classNames({
                'message__my-content': message.userId === user?.id,
                'message__other-content': message.userId !== user?.id,
              })}
              key={index}
            >
              {JSON.stringify(message)}
            </li>
          ))}
        </ul>
        <div className="message__form">
          <button>
            <AiFillPlusSquare className="message__option" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 보내기"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button onClick={handleSend}>
            <FaPaperPlane className="message__submit" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
