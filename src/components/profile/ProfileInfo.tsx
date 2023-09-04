import React from 'react';
import { UserType } from '@/core';
import ProfileImage from './ProfileImage';

interface ProfileInfoProps {
  profile: UserType;
}

function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <section className="profile-info">
      <h2 className="profile-info__title">{profile?.username || 'GUEST'}</h2>
      <div className="profile-info__desc">
        <ProfileImage profile={profile} />
        <p className="profile-info__desc__nickname">
          {profile?.nickname || '게스트'}
        </p>
        <p className="profile-info__desc__bio">{profile?.bio || '자기소개'}</p>
      </div>
      <div className="profile-info__background"></div>
    </section>
  );
}

export default ProfileInfo;
