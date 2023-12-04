import React from 'react';
import { FEED_STATUS } from '@/core';
import FeedService from '@/services/feed';
import useAuth from '@/hooks/useAuth';
import InfinityDataList from '../common/InfinityDataList';
import ProfileFeedListItem from '../profile/ProfileFeedListItem';

const ArchivedFeedList = () => {
  const { payload } = useAuth();

  return (
    <div className="profile-feeds-list">
      <InfinityDataList
        queryKey={['archived-feeds']}
        listType={'scroll'}
        fetchData={(page) =>
          FeedService.getFeedsByUser(payload?.username, {
            page,
            limit: 9,
            status: FEED_STATUS.ARCHIVED,
          })
        }
        renderToChildComponent={ProfileFeedListItem}
      ></InfinityDataList>
    </div>
  );
};

export default ArchivedFeedList;
