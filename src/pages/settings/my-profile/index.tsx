import React from 'react';
import { useRouter } from 'next/router';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import MyProfileInfo from '@/components/my-profile/MyProfileInfo';

const MyProfile = () => {
  const router = useRouter();

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>내 정보</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <MyProfileInfo />
        </div>
      </article>
    </>
  );
};

export default MyProfile;
