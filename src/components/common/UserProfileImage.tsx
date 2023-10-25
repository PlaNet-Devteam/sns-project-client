import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import styles from './UserProfileImage.module.scss';

interface UserProfileImageProps {
  username?: string;
  imagePath?: string;
}

const UserProfileImage = ({ username, imagePath }: UserProfileImageProps) => {
  return (
    <Link href={`/${username}`} className={styles.profile_image}>
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
    </Link>
  );
};

export default UserProfileImage;
