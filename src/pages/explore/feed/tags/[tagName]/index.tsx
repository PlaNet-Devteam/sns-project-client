import React from 'react';
import { useRouter } from 'next/router';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import InfinityDataList from '@/components/common/InfinityDataList';
import { FeedType } from '@/core';
import FeedService from '@/services/feed';
import ProfileFeedListItem from '@/components/profile/ProfileFeedListItem';
import ExploreTagInfo from '@/components/explore/ExploreTagInfo';

const FeedTagName = () => {
  const router = useRouter();

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>검색 결과</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <ExploreTagInfo />
          <div className="profile-feeds-list">
            <InfinityDataList<FeedType>
              queryKey={['feedByTags', router.query.tagName]}
              listType={'scroll'}
              fetchData={(page) =>
                FeedService.getFeedsByTag({
                  page,
                  limit: 9,
                  tagName: router.query.tagName as string,
                })
              }
              ChildCompoentToRender={ProfileFeedListItem}
            ></InfinityDataList>
          </div>
        </div>
      </article>
    </>
  );
};

export default FeedTagName;
