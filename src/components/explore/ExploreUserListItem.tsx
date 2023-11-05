import { useRecoilValue } from 'recoil';
import { UserType } from '@/core';
import useAuth from '@/hooks/useAuth';
import { userState } from '@/store/userAtom';
import UserProfileImage from '../common/UserProfileImage';
import styles from './ExploreUserListItem.module.scss';

interface ExploreUserListItemProps {
  item: UserType;
}

const ExploreUserListItem = ({ item }: ExploreUserListItemProps) => {
  const { payload } = useAuth();
  const myInfo = useRecoilValue(userState);

  const isVisibleFollowerCount =
    payload?._id === item.id || myInfo?.followingIds.includes(item.id);

  return (
    <div className={styles.item}>
      <div className={styles.item_userProfile}>
        <div className={styles.item_profileImage}>
          <UserProfileImage
            username={item.username}
            imagePath={item.profileImage}
          />
        </div>
        <div className={styles.item_profileInfo}>
          <span className={styles.item_profileInfo_username}>
            {item.username}
          </span>
          <span className={styles.item_profileInfo_nickname}>
            {item.nickname}
            {isVisibleFollowerCount && (
              <>
                {item.followerCount > 0 && (
                  <> · 팔로워 {item.followerCount}명</>
                )}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExploreUserListItem;
