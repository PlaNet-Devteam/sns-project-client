import React from 'react';
import { useRouter } from 'next/router';
import FeedService from '@/services/feed';
import useAuth from '@/hooks/useAuth';
import InfinityDataList from '../common/InfinityDataList';
import ProfileFeedListItem from './ProfileFeedListItem';

interface ProfileFeedListProps {
  queryKey: string;
}

function ProfileFeedList({ queryKey }: ProfileFeedListProps) {
  const router = useRouter();
  const { username } = router.query;
  const { payload } = useAuth();

  return (
    <>
      <div className="profile-feeds-list">
        <InfinityDataList
          queryKey={[`${queryKey}-${username}`]}
          listType={'scroll'}
          fetchData={(page) => {
            if (queryKey === 'bookmark') {
              return FeedService.getFeedsByBookmark({
                page,
                limit: 9,
              });
            } else {
              return FeedService.getFeedsByUser(username, {
                page,
                limit: 9,
                viewerId: payload?._id,
              });
            }
          }}
          renderToChildComponent={ProfileFeedListItem}
        ></InfinityDataList>
      </div>
    </>
  );
}

export default ProfileFeedList;
