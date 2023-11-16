import React from 'react';
import { FEED_STATUS, FeedType } from '@/core';
import FeedService from '@/services/feed';
import useAuth from '@/hooks/useAuth';
import InfinityDataList from '../common/InfinityDataList';
import ProfileFeedListItem from '../profile/ProfileFeedListItem';

const ArchivedFeedList = () => {
  const { payload } = useAuth();

  return (
    <div className="profile-feeds-list">
      <InfinityDataList<FeedType>
        queryKey={['archived-feeds']}
        listType={'scroll'}
        fetchData={(page) =>
          FeedService.getFeedsByUser(payload?.username, {
            page,
            limit: 9,
            status: FEED_STATUS.ARCHIVED,
          })
        }
        ChildCompoentToRender={ProfileFeedListItem}
        propsObject={{ queryKey: ['archived-feeds'] }}
      ></InfinityDataList>
    </div>
  );
};

export default ArchivedFeedList;
