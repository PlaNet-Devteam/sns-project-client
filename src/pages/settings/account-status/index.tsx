import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import SettingsHeader from '@/components/settings/SettingsHeader';
import { USER_STATUS } from '@/core';
import UserService from '@/services/user';
import Dialog from '@/components/dialog/Dialog';
import TypoText from '@/components/common/TypoText';
import { userState } from '@/store/userAtom';
import SwitchButton from '@/components/common/SwitchButton';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const AccountStatus = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const myInfo = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      if (myInfo?.status === USER_STATUS.ACTIVE) {
        return await UserService.updateUserStatus({
          status: USER_STATUS.INACTIVE,
        });
      } else {
        return await UserService.updateUserStatus({
          status: USER_STATUS.ACTIVE,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user', myInfo?.username]);
      setIsModalOpen(false);
    },
  });

  const onChangeUserStatusHandler = () => {
    mutateAsync();
  };

  const onClickModalOpenHandler = () => {
    setIsModalOpen((prevStatus) => !prevStatus);
  };

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>계정 공개 범위</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <SettingsHeader>
            <SettingsHeader.Title>계정 공개 범위</SettingsHeader.Title>
            <SettingsHeader.Desc>
              계정이 공개 상태인 경우 계정이 없는 사람을 포함해서 모든 사람이
              프로필과 게시물을 볼 수 있습니다.
              <br />
              <br />
              계정이 비공개 상태인 경우 회원님이 승인한 팔로워만 회원님이
              공유하는 콘텐츠, 팔로워 및 팔로잉 리스트를 볼 수 있습니다.
            </SettingsHeader.Desc>
          </SettingsHeader>
          <SwitchButton
            id="aa"
            defaultChecked={
              myInfo?.status === USER_STATUS.INACTIVE ? true : false
            }
            label="계정 비활성화"
            readOnly={true}
            onClick={onClickModalOpenHandler}
          />
        </div>
      </article>
      <Dialog isOpen={isModalOpen}>
        <Dialog.Dimmed onClick={onClickModalOpenHandler} />
        <Dialog.Content>
          <div className="text-center">
            {myInfo?.status === USER_STATUS.ACTIVE ? (
              <>
                <TypoText tagName="h3" color="white">
                  <>
                    비공개 계정으로 <br />
                    전환하시겠습니까?
                  </>
                </TypoText>
                <TypoText tagName="p" color="gray">
                  회원님의 팔로워만 회원님의 <br />
                  피드를 볼 수 있습니다
                </TypoText>
              </>
            ) : (
              <>
                <TypoText tagName="h3" color="white">
                  <>
                    공개 계정으로 <br />
                    전환하시겠습니까?
                  </>
                </TypoText>
                <TypoText tagName="p" color="gray">
                  누구나 회원님의 피드를 <br />볼 수 있습니다
                </TypoText>
              </>
            )}
          </div>
        </Dialog.Content>
        <Dialog.LabelButton
          color="essential"
          onClick={() => onChangeUserStatusHandler()}
        >
          {isLoading ? (
            <>
              <LoadingSpinner variant="white" />
            </>
          ) : (
            <>
              {myInfo?.status === USER_STATUS.ACTIVE
                ? '비공개로 전환'
                : '공개로 전환'}
            </>
          )}
        </Dialog.LabelButton>
        <Dialog.LabelButton
          color="white"
          onClick={() => onClickModalOpenHandler()}
        >
          취소
        </Dialog.LabelButton>
      </Dialog>
    </>
  );
};

export default AccountStatus;
