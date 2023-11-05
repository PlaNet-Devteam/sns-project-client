import React from 'react';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { genderTransformer } from '@/core';
import { userState } from '@/store/userAtom';
import TypoText from '../common/TypoText';
import ProfileImage from '../profile/ProfileImage';
import ButtonGroup from '../common/ButtonGroup';
import Button from '../common/Button';

const MyProfileInfo = () => {
  const myInfo = useRecoilValue(userState);

  return (
    <>
      {myInfo && (
        <>
          <ProfileImage profile={myInfo} />
          <div className="row-box">
            <TypoText color="essential">계정명</TypoText>
            <TypoText color="white">{myInfo.username}</TypoText>
            <TypoText color="essential">닉네임</TypoText>
            <TypoText color="white">{myInfo.nickname}</TypoText>
            <TypoText color="essential">이메일</TypoText>
            <TypoText color="white">{myInfo.email}</TypoText>
            <TypoText color="essential">성별</TypoText>
            <TypoText color="white">
              {myInfo.gender && genderTransformer(myInfo.gender)}
            </TypoText>
            <TypoText color="essential">가입 일자</TypoText>
            <TypoText color="white">
              {dayjs(myInfo.createdAt).format(
                'YYYY년 MM월 DD일 hh시 mm분 ss초',
              )}
            </TypoText>
            <TypoText color="essential">최근 로그인 일자</TypoText>
            <TypoText color="white">
              {dayjs(myInfo.lastLoginAt).format(
                'YYYY년 MM월 DD일 hh시 mm분 ss초',
              )}
            </TypoText>
          </div>
          <ButtonGroup>
            <Button variant="secondary" isFull to="/profile/edit">
              프로필 편집
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  );
};

export default MyProfileInfo;
