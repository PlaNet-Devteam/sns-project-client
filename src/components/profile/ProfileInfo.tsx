import React from 'react';
import Image from 'next/image';
import { UserType } from '@/core';

interface ProfileInfoProps {
  profile: UserType;
}

function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <section className="profile-info">
      <h2 className="profile-info__title">{profile?.username || 'GUEST'}</h2>
      <div className="profile-info__desc">
        <div className="profile-info__desc__image">
          <figure className="profile-info__desc__image--figure">
            <Image
              src={'/img/icons/icon_default_profile.svg'}
              width={120}
              height={120}
              alt="프로필 이미지"
            />
          </figure>
        </div>
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
