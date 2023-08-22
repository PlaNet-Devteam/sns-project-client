import React from 'react';
import { UserType } from '@/core';

interface ProfileCountType {
  profile: UserType;
}

function ProfileCount({ profile }: ProfileCountType) {
  return (
    <section className="profile-counts">
      <div className="profile-counts__box">
        <span className="profile-counts__title">피드</span>
        <p className="profile-counts__count">{profile?.feedCount || 0}</p>
      </div>
      <div className="profile-counts__box">
        <span className="profile-counts__title">팔로워</span>
        <p className="profile-counts__count">{profile?.followerCount || 0}</p>
      </div>
      <div className="profile-counts__box">
        <span className="profile-counts__title">팔로잉</span>
        <p className="profile-counts__count">{profile?.followingCount || 0}</p>
      </div>
    </section>
  );
}

export default ProfileCount;
