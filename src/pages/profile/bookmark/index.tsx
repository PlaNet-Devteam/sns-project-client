import React from 'react';
import ProfileLayout from '@/components/layouts/ProfileLayout';
import ProfileFeedList from '@/components/profile/ProfileFeedList';

const dummyFeeds: any[] = [
  {
    id: 1,
    title: 'BOOMARK 1',
  },
  {
    id: 2,
    title: 'BOOMARK 2',
  },
];

function Bookmark() {
  return (
    <ProfileLayout>
      <ProfileFeedList feeds={dummyFeeds} />
    </ProfileLayout>
  );
}

export default Bookmark;
