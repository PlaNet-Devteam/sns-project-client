import React from 'react';
import ExploreUserList from '@/components/explore/ExploreUserList';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import ExploreTab from '@/components/explore/ExploreTab';

const Explore = () => {
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
          <ExploreUserList />
        </div>
      </article>
    </>
  );
};

export default Explore;
