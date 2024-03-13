import React, { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  AxiosErrorResponseType,
  CONST_GENDER,
  GENDER,
  UserType,
  UserUpdateType,
  genderTransformer,
} from '@/core';
import UserService from '@/services/user';
import useForm from '@/hooks/useForm';
import InputField from '../common/form/InputField';
import TextAreaField from '../common/form/TextAreaField';
import ButtonGroup from '../common/ButtonGroup';
import ErrorMessage from '../common/ErrorMessage';
import Button from '../common/Button';
import ProfileImage from './ProfileImage';

const genderOptions: GENDER[] = [...CONST_GENDER];

interface ProfileEditFormProps {
  profile: UserType;
}

const LoadingLayer = dynamic(() => import('@/components/common/LoadingLayer'), {
  ssr: false,
});

const ProfileEditForm = ({ profile }: ProfileEditFormProps) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState([]);

  const userInitialState = {
    nickname: profile.nickname,
    bio: profile.bio,
    gender: profile.gender,
  };

  const {
    formData: userUpdate,
    onChange,
    onReset,
  } = useForm<UserUpdateType>(userInitialState);

  const { mutateAsync, isLoading, isError } = useMutation(
    (formData: UserUpdateType) => {
      if (profile.id !== undefined) {
        return UserService.updateUser(profile.id, formData);
      }
      return Promise.reject(new Error('유저 정보를 불러오지 못했습니다'));
    },
    {
      onSuccess: () => {
        router.back();
      },
      onError: (error: AxiosErrorResponseType) => {
        setErrorMessage(error?.response?.data.message);
      },
    },
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: UserUpdateType,
  ) => {
    event.preventDefault();
    await mutateAsync(formData);
  };

  if (isLoading) return <LoadingLayer />;

  return (
    <div>
      <div className="profile-info">
        <h2 className="profile-info__title">{profile.username}</h2>
        <ProfileImage profile={profile} />
      </div>
      <div className="form-area">
        <form
          className="login-form"
          onSubmit={(event) => onSubmitForm(event, userUpdate)}
        >
          <div className="form-group">
            <div className="input-group">
              <InputField
                type="text"
                value={userUpdate.nickname || ''}
                name="nickname"
                placeholder="닉네임"
                onChange={onChange}
                onReset={onReset}
              />
            </div>
            <div className="input-group">
              <select
                name="gender"
                value={userUpdate.gender}
                onChange={onChange}
                className="select-box"
              >
                {genderOptions.map((option) => (
                  <option key={option} value={option} className="select-option">
                    {genderTransformer(option)}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <TextAreaField
                name="bio"
                value={userUpdate.bio || ''}
                onReset={onReset}
                onChange={onChange}
                placeholder="내용을 입력해주세요."
                maxLength={50}
              />
            </div>
          </div>
          {isError && <ErrorMessage errorMessage={errorMessage} />}
          <ButtonGroup>
            <Button
              size="md"
              variant="primary"
              type="submit"
              isEnglish
              isFull
              isDisabled={
                JSON.stringify(userUpdate) === JSON.stringify(userInitialState)
              }
            >
              EDIT
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;
