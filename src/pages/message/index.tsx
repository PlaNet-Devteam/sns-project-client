import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import MsgHeader from '@/components/message/MsgListHeader';
import { userState } from '@/store/userAtom';

const MessageList = () => {
  const user = useRecoilValue(userState);
  return (
    <div className="msglist__container">
      <MsgHeader username={user?.username} />
      <div className="none__chatroom">채팅방이 없습니다.</div>
    </div>
  );
};

export default MessageList;
