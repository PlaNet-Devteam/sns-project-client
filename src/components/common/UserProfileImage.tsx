import React from 'react';
import Link from 'next/link';
import styles from './UserProfileImage.module.scss';
import SkeletonImage from './img/BaseImage';

interface UserProfileImageProps {
  username?: string;
  imagePath: string;
}

const UserProfileImage = ({ username, imagePath }: UserProfileImageProps) => {
  const profileImage = (
    <SkeletonImage
      width={100}
      height={100}
      src={imagePath}
      alt={`${username} 프로필 이미지`}
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
