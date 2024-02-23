import React, { useRef } from 'react';
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

interface MessageData {
  sender: number;
  content: string;
}

const Message = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<ChatUserGatewayType[]>([]);
  const messagesEndRef = useRef<HTMLUListElement>(null);
  const [messageTarget, setMessageTarget] = useState('');
  const [prevMessages, setPrevMessages] = useState<MessageData[]>([]);

  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    socket.on('message', (data: ChatUserGatewayType) => {
      setMessageList([...messageList, data]);
    });
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
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

  useEffect(() => {
    socket.emit('get_other_user', {
      roomId: router.query.roomId,
      user1Id: user?.id,
    });
    socket.on('get_other_user', (data: string) => {
      setMessageTarget(data);
    });
  }, []);

  useEffect(() => {
    socket.emit('get_chat_data', {
      roomId: router.query.roomId,
    });
    socket.on('get_chat_data', (data: MessageData[]) => {
      // console.log(data);
      setPrevMessages(data);
    });
  }, []);

  return (
    <div className="chat__container">
      <ChatHeader username={messageTarget} />
      <div className="message__container">
        <ul className="message__contents" ref={messagesEndRef}>
          {prevMessages
            ? prevMessages.map((message: MessageData, index: number) => (
                <li
                  className={classNames({
                    'message__my-content': message.sender === user?.id,
                    'message__other-content': message.sender !== user?.id,
                  })}
                  key={index}
                >
                  {message.content}
                </li>
              ))
            : null}
        </ul>
        <ul className="message__contents" ref={messagesEndRef}>
          {messageList.map((message: ChatUserGatewayType, index: number) => (
            <li
              className={classNames({
                'message__my-content': message.userId === user?.id,
                'message__other-content': message.userId !== user?.id,
              })}
              key={index}
            >
              {message.message}
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
