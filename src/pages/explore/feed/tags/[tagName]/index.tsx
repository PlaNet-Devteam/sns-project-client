import React from 'react';
import { useRouter } from 'next/router';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import InfinityDataList from '@/components/common/InfinityDataList';
import FeedService from '@/services/feed';
import ProfileFeedListItem from '@/components/profile/ProfileFeedListItem';
import ExploreTagInfo from '@/components/explore/ExploreTagInfo';
import useAuth from '@/hooks/useAuth';

const FeedTagName = () => {
  const router = useRouter();
  const { payload } = useAuth();

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
            <InfinityDataList
              queryKey={['feedByTags', router.query.tagName as string]}
              listType={'scroll'}
              fetchData={(page) =>
                FeedService.getFeeds({
                  page,
                  limit: 9,
                  tagName: router.query.tagName as string,
                  viewerId: payload?._id,
                })
              }
              renderToChildComponent={ProfileFeedListItem}
            ></InfinityDataList>
          </div>
        </div>
      </article>
    </>
  );
};

export default FeedTagName;
