import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { UserType } from '@/core';
import UserService from '@/services/user';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import useAuth from '@/hooks/useAuth';
import ProfileEditForm from '@/components/profile/ProfileEditForm';

const LoadingLayer = dynamic(() => import('@/components/common/LoadingLayer'), {
  ssr: false,
});

function ProfileEdit() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { payload } = useAuth();
  const { data: user, isLoading } = useQuery<UserType>(
    [['user-edit', payload?.username]],
    () => UserService.findUserByUsername(payload?.username as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', router.query.username]);
        queryClient.invalidateQueries(['user', payload?.username]);
      },
    },
  );

  if (isLoading) return <LoadingLayer />;

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>프로필 수정</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      {user && (
        <div className="profile-edit grid">
          <ProfileEditForm profile={user} />
        </div>
      )}
    </>
  );
}

export default ProfileEdit;
