import React from 'react';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { AiFillPlusSquare } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { userState } from '@/store/userAtom';
import MsgHeader from '@/components/message/MsgHeader';

const socket = io('http://localhost:8080/');
console.log(socket);

const Message = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<any>([]);

  const user = useRecoilValue(userState);

  useEffect(() => {
    socket.on('message', (data: string) => {
      console.log(data);
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  const handleSend = () => {
    socket.emit('message', [user?.username, message]);
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
    <div className="chat__container">
      <MsgHeader />
      <div className="message__container">
        <ul className="message__contents">
          {messageList.map((msg: string, index: number) => (
            <li
              className={classNames({
                'message__my-content': msg[0] === user?.username,
                'message__other-content': msg[0] !== user?.username,
              })}
              key={index}
            >
              {msg[1]}
            </li>
          ))}
        </ul>
        <div className="message__form">
          <button>
            <AiFillPlusSquare className="message__option" color="#1ba2f3" />
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
            <FaPaperPlane className="message__submit" color="#1ba2f3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
