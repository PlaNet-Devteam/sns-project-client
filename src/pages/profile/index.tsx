import React from 'react';
import ProfileFeedList from '@/components/profile/ProfileFeedList';
import ProfileLayout from '@/components/layouts/ProfileLayout';

const dummyFeeds: any[] = [
  {
    id: 1,
    title: 'FEED 1',
  },
  {
    id: 2,
    title: 'FEED 2',
  },
];

function Profile() {
  return (
    <ProfileLayout>
      <ProfileFeedList feeds={dummyFeeds} />
    </ProfileLayout>
  );
}

export default Profile;
