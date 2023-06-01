import React from 'react';
import ProfileFeedList from '@/components/Profile/ProfileFeedList';
import ProfileLayout from '@/components/Layouts/ProfileLayout';

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
