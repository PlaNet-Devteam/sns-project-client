import React from 'react';
import { useRouter } from 'next/router';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import UserBlockList from '@/components/user-block/UserBlockList';

const BlockUser = () => {
  const router = useRouter();

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>차단된 계정</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <UserBlockList />
        </div>
      </article>
    </>
  );
};

export default BlockUser;
