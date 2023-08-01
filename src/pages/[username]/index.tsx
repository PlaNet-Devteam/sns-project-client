import React from 'react';
import ProfileFeedList from '@/components/profile/ProfileFeedList';
import ProfileLayout from '@/components/layouts/ProfileLayout';

const Profile = () => {
  return (
    <ProfileLayout>
      <ProfileFeedList queryKey="myFeeds" />
    </ProfileLayout>
  );
};

export default Profile;
