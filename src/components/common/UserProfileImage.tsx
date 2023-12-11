import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import isExternalImage from '@/core/utils/is-external-image';
import styles from './UserProfileImage.module.scss';

interface UserProfileImageProps {
  username?: string;
  imagePath?: string;
}

const UserProfileImage = ({ username, imagePath }: UserProfileImageProps) => {
  const profileImage = (
    <Image
      width={100}
      height={100}
      src={
        imagePath
          ? isExternalImage(imagePath)
            ? imagePath
            : `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${imagePath}`
          : '/img/icons/icon_default_profile.svg'
      }
      alt={imagePath ? '프로필 이미지' : '기본 프로필 이미지'}
    />
  );

  return (
    <>
      {username ? (
        <Link href={`/${username}`} className={styles.profile_image}>
          {profileImage}
        </Link>
      ) : (
        <div className={styles.profile_image}>{profileImage}</div>
      )}
    </>
  );
};
export default UserProfileImage;
