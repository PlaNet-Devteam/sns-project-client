import React from 'react';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import ExploreTab from '@/components/explore/ExploreTab';
import ExploreFeedList from '@/components/explore/ExploreFeedList';

const ExploreFeed = () => {
  return (
    <>
      <TopHeader>
        <TopHeader.Left></TopHeader.Left>
        <TopHeader.Title>탐색</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <ExploreTab />
          <ExploreFeedList />
        </div>
      </article>
    </>
  );
};

export default ExploreFeed;
