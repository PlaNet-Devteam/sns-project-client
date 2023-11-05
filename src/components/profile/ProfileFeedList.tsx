import React from 'react';
import { useRouter } from 'next/router';
import { FeedType } from '@/core/types/feed';
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
        <InfinityDataList<FeedType>
          queryKey={[`${queryKey}-${username}`]}
          listType={'scroll'}
          fetchData={(page) => {
            if (queryKey === 'bookmark') {
              return FeedService.findAllByBookmark({
                page,
                limit: 9,
              });
            } else {
              return FeedService.findAllByUser(username, {
                page,
                limit: 9,
                viewerId: payload?._id,
              });
            }
          }}
          ChildCompoentToRender={ProfileFeedListItem}
        ></InfinityDataList>
      </div>
    </>
  );
}

export default ProfileFeedList;
