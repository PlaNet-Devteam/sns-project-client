import React, { FormEvent, useRef } from 'react';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaPaperPlane } from 'react-icons/fa';
import { userState } from '@/store/userAtom';
import MessageService from '@/services/message';
import { MessageType } from '@/core/types/message';
import RoomService from '@/services/room';
import { RoomType } from '@/core/types/room';
import DirectMessageListItem from './DirectMessageListItem';
import styles from './DirectMessageList.module.scss';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

const DirectMessageList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  queryClient.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: false,
    },
  });

  const user = useRecoilValue(userState);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages } = useQuery(
    ['messages', router.query.roomUniqueId],
    () => MessageService.getMessages(router.query.roomUniqueId as string),
  );

  const { data: room } = useQuery<RoomType>(
    ['room', router.query.roomUniqueId],
    () =>
      RoomService.getRoomByRoomUniqueId(router.query.roomUniqueId as string),
  );

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket server connected.');
    });
    socket.on('disconnect', () => {
      console.log('socket server disconnected.');
    });
  }, []);

  useEffect(() => {
    socket.on('message', (data: MessageType) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  useEffect(() => {
    return () => {
      socket.emit('save_message', {
        roomUniqueId: router.query.roomUniqueId,
        userId: user?.id,
      });
    };
  }, [router.query.roomUniqueId, user?.id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    socket.emit('join_room', {
      roomUniqueId: router.query.roomUniqueId,
    });
    socket.on('join_room', (roomUniqueId: string) => {
      console.log(`${roomUniqueId} 채팅방에 접속중`);
      // if (data.messages && data.messages.length > 0) {
      //   setMessageList([...data.messages]);
      // }
    });
  }, [router.query.roomUniqueId]);

  const messageLastIndexBeforeUserIdChange: number[] = [];

  if (messages) {
    messages.forEach((message, index) => {
      const currentUserId = message.userId;
      if (index > 0 && messages[index - 1].userId !== currentUserId) {
        messageLastIndexBeforeUserIdChange.push(index - 1);
      }
    });
  }
  const messageLastElementIndex = messageList.length - 1;
  messageLastIndexBeforeUserIdChange.push(messageLastElementIndex);

  const lastIndexBeforeUserIdChange: number[] = [];

  messageList.forEach((message, index) => {
    const currentUserId = message.userId;
    if (index > 0 && messageList[index - 1].userId !== currentUserId) {
      lastIndexBeforeUserIdChange.push(index - 1);
    }
  });

  const messageListLastElementIndex = messageList.length - 1;
  lastIndexBeforeUserIdChange.push(messageListLastElementIndex);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>, message: string) => {
    event.preventDefault();
    if (message.length > 0) {
      if (user) {
        socket.emit('message', {
          roomUniqueId: router.query.roomUniqueId,
          message: {
            userId: user?.id,
            roomId: room?.id,
            user: user,
            createdAt: new Date(),
            message,
          },
        });
      }
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.list} ref={messagesEndRef}>
        <div>
          {messages &&
            messages.length > 0 &&
            messages.map((message, index) => {
              const prevUserId = index > 0 ? messages[index - 1].userId : null;

              return (
                <DirectMessageListItem
                  item={message}
                  key={message.id}
                  isFirst={
                    (prevUserId !== null && prevUserId !== message.userId) ||
                    index === 0
                  }
                  isLast={messageLastIndexBeforeUserIdChange.includes(index)}
                />
              );
            })}
          {messageList &&
            messageList.map((message, index) => {
              const prevUserId =
                index > 0 ? messageList[index - 1].userId : null;
              return (
                <>
                  <DirectMessageListItem
                    item={message}
                    key={index}
                    isFirst={
                      (prevUserId !== null && prevUserId !== message.userId) ||
                      index === 0
                    }
                    isLast={lastIndexBeforeUserIdChange.includes(index)}
                  />
                </>
              );
            })}
        </div>
      </div>
      <div className={styles.input}>
        <form
          onSubmit={(event) => onSubmitForm(event, message)}
          className={styles.form}
        >
          <input
            type="text"
            value={message}
            placeholder="메세지 보내기"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <FaPaperPlane color="white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DirectMessageList;
