import Image from 'next/image';
import React from 'react';
import styles from './UserProfileImage.module.scss';

interface UserProfileImageProps {
  imagePath?: string;
}

const UserProfileImage = ({ imagePath }: UserProfileImageProps) => {
  return (
    <div className={styles.profile_image}>
      {imagePath ? (
        <Image
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${imagePath}`}
          alt="프로필 이미지"
        />
      ) : (
        <Image
          src={'/img/icons/icon_default_profile.svg'}
          width={100}
          height={100}
          alt="기본 프로필 이미지"
        />
      )}
    </div>
  );
};

export default UserProfileImage;
