import React from 'react';
import { useRouter } from 'next/router';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import ArchivedFeedList from '@/components/archived/ArchivedFeedList';
import ArchivedFeedInfo from '@/components/archived/ArchivedFeedInfo';

const ArchivedFeed = () => {
  const router = useRouter();
  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>보관함</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <ArchivedFeedInfo />
          <ArchivedFeedList />
        </div>
      </article>
    </>
  );
};

export default ArchivedFeed;
