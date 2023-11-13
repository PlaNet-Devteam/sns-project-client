import React from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { FeedType } from '@/core/types/feed';
import FeedService from '@/services/feed';
import useAuth from '@/hooks/useAuth';
import { feedModalState, isFeedModalOpenState } from '@/store/feedAtom';
import InfinityDataList from '../common/InfinityDataList';
import FeedModal from '../common/FeedModal';
import ProfileFeedListItem from './ProfileFeedListItem';
import ProfileFeedModal from './ProfileFeedModal';

interface ProfileFeedListProps {
  queryKey: string;
}

function ProfileFeedList({ queryKey }: ProfileFeedListProps) {
  const router = useRouter();
  const { username } = router.query;
  const { payload } = useAuth();

  const setFeedModalState = useSetRecoilState(feedModalState);
  const [isFeedModalOpen, setIsFeedModalOpen] =
    useRecoilState(isFeedModalOpenState);

  const onClickFeedModalOpenHandler = () => {
    setIsFeedModalOpen(false);
    setFeedModalState(null);
  };

  return (
    <>
      <div className="profile-feeds-list">
        <InfinityDataList<FeedType>
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
          ChildCompoentToRender={ProfileFeedListItem}
          propsObject={{ queryKey: [`${queryKey}-${username}`] }}
        ></InfinityDataList>
      </div>
      <FeedModal
        isModalOpen={isFeedModalOpen}
        onClickCloseModal={onClickFeedModalOpenHandler}
      >
        <ProfileFeedModal />
      </FeedModal>
    </>
  );
}

export default ProfileFeedList;
