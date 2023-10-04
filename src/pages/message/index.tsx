import React from 'react';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { AiFillPlusSquare } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userAtom';

const socket = io('http://localhost:8080/');
console.log(socket);

const Message = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<any>([]);

  const user = useRecoilValue(userState);

  useEffect(() => {
    socket.on('message', (data: string) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  const handleSend = () => {
    socket.emit('message', message);
    console.log(message);
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

  return (
    <div className="message__container">
      <h1>{user?.username}</h1>
      <div className="message__contents">
        <ul>
          {messageList.map((msg: string, index: number) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <div className="msg">
        <div className="message__form">
          <button>
            <AiFillPlusSquare color="white" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 보내기"
          />
          <button onClick={handleSend}>
            <FaPaperPlane className="message__submit" color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
