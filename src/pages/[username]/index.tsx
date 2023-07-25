import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ProfileFeedList from '@/components/profile/ProfileFeedList';
import ProfileLayout from '@/components/layouts/ProfileLayout';
import FeedService from '@/services/feed';

const Profile = () => {
  const router = useRouter();
  const { username } = router.query;

  const { data: feeds } = useQuery(['myFeeds'], () =>
    FeedService.findAllByUser(username),
  );

  return (
    <ProfileLayout>{feeds && <ProfileFeedList feeds={feeds} />}</ProfileLayout>
  );
};

export default Profile;
