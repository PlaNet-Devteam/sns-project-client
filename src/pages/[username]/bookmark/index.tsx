import React from 'react';
import ProfileLayout from '@/components/layouts/ProfileLayout';
import ProfileFeedList from '@/components/profile/ProfileFeedList';

function Bookmark() {
  return (
    <ProfileLayout>
      <ProfileFeedList queryKey="bookmark" />
    </ProfileLayout>
  );
}

export default Bookmark;
