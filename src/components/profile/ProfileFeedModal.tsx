import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import FeedService from '@/services/feed';
import { feedModalState } from '@/store/feedAtom';
import useAuth from '@/hooks/useAuth';
import { userState } from '@/store/userAtom';
import FeedItem from '../feed/FeedItem';
import LoadingAni from '../common/LoadingAni';
import styles from './ProfileFeedModal.module.scss';

const ProfileFeedModal = () => {
  const { payload } = useAuth();
  const feedModal = useRecoilValue(feedModalState);
  const user = useRecoilValue(userState);

  const { data: item, isLoading } = useQuery({
    queryKey: ['feed-modal', feedModal?.id],
    queryFn: () => {
      if (feedModal) {
        if (user || payload) {
          return FeedService.getFeedByUser(feedModal?.id);
        } else {
          return FeedService.getFeed(feedModal?.id);
        }
      }
    },
  });

  return (
    <div className={styles.modal}>
      {isLoading ? <LoadingAni /> : <>{item && <FeedItem item={item} />}</>}
    </div>
  );
};

export default ProfileFeedModal;
