import React, { useState } from 'react';
import { FiUserPlus, FiTrash, FiUserMinus } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { BsShieldFillCheck } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { FollowCreateType } from '@/core/types/follow';
import { FOLLOW, UserType } from '@/core';
import FollowService from '@/services/follow';
import { userState } from '@/store/userAtom';
import UserProfileImage from '../common/UserProfileImage';
import Button from '../common/Button';
import Dialog from '../dialog/Dialog';
import TypoText from '../common/TypoText';
import styles from './FollowListItem.module.scss';

interface FollowListItemProps {
  queryKey: string;
  item: UserType;
}

const FollowListItem = ({ queryKey, item }: FollowListItemProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const myInfo = useRecoilValue(userState);
  const [followings, setFollowings] = useState<number[] | undefined>(
    myInfo?.followingIds,
  );
  const [isDialogOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: followUserMutation } = useMutation({
    mutationFn: (formData: FollowCreateType) =>
      FollowService.createFollow(formData),
    onSuccess: (data, formData) => {
      setFollowings((prevState) => {
        return prevState?.concat([formData.followingId]);
      });
      queryClient.invalidateQueries(['user', myInfo?.username]);
    },
  });

  const { mutateAsync: unfollowUserMutation } = useMutation({
    mutationFn: (formData: FollowCreateType) =>
      FollowService.deleteFollow(formData),
    onSuccess: (data, formData) => {
      setFollowings((prevState) => {
        return prevState?.filter((number) => number !== formData.followingId);
      });
      queryClient.invalidateQueries([queryKey, router.query.username]);
      queryClient.invalidateQueries(['user', myInfo?.username]);
    },
  });

  const onClickFollowHandler = (item: UserType) => {
    if (myInfo) {
      if (queryKey === FOLLOW.FOLLOWINGS) {
        followUserMutation({
          userId: myInfo?.id,
          followingId: item.id,
        });
      } else {
        followUserMutation({
          userId: myInfo?.id,
          followingId: item.id,
        });
      }
    }
  };

  const onClickUnfollowHandler = (item: UserType) => {
    if (myInfo) {
      unfollowUserMutation({
        userId: myInfo?.id,
        followingId: item.id,
      });
    }
  };

  const onClickDeleteUserHandler = (item: UserType) => {
    if (myInfo) {
      unfollowUserMutation({
        userId: item.id,
        followingId: myInfo?.id,
      });
    }
  };

  return (
    <>
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
              {item.username}&nbsp;
              {item.id === myInfo?.id && <BsShieldFillCheck color="1ba2f3" />}
            </span>
            <span className={styles.item_profileInfo_nickname}>
              {item.nickname}
            </span>
          </div>
        </div>
        {myInfo?.id !== item.id && (
          <>
            <div className={styles.item_options}>
              {queryKey === FOLLOW.FOLLOWINGS ? (
                <>
                  {followings && !followings.includes(item.id) ? (
                    <>
                      <Button
                        variant="primary"
                        isEnglish={true}
                        iconOnly
                        size="sm"
                        onClick={() => onClickFollowHandler(item)}
                      >
                        <FiUserPlus />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="gray"
                        isEnglish={true}
                        iconOnly
                        size="sm"
                        onClick={() => onClickUnfollowHandler(item)}
                      >
                        <FiUserMinus />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {followings && !followings.includes(item.id) && (
                    <>
                      <Button
                        variant="primary"
                        isEnglish={true}
                        iconOnly
                        size="sm"
                        onClick={() => onClickFollowHandler(item)}
                      >
                        <FiUserPlus />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="gray"
                    isEnglish={true}
                    iconOnly
                    size="sm"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FiTrash />
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <Dialog isOpen={isDialogOpen}>
        <Dialog.Dimmed onClick={() => setIsModalOpen(false)} />
        <Dialog.Content>
          <div className="text-center">
            <UserProfileImage
              username={item.username}
              imagePath={item.profileImage}
            />
          </div>
          <div className="row-box text-center">
            <TypoText tagName="h3" color="white">
              팔로워를 삭제하시겠습니까?
            </TypoText>
            <TypoText tagName="p" color="gray">
              {item.username} 님은 <br />
              회원님의 팔로워 리스트에서 <br />
              삭제된 사실을 알 수 없습니다
            </TypoText>
          </div>
        </Dialog.Content>
        <Dialog.LabelButton
          color="danger"
          onClick={() => onClickDeleteUserHandler(item)}
        >
          삭제
        </Dialog.LabelButton>
        <Dialog.LabelButton color="gray" onClick={() => setIsModalOpen(false)}>
          취소
        </Dialog.LabelButton>
      </Dialog>
    </>
  );
};

export default FollowListItem;
