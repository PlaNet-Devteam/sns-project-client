import React, { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import {
  CONST_GENDER,
  GENDER,
  UserType,
  UserUpdateType,
  genderTransformer,
} from '@/core';
import useForm from '@/hooks/useForm';
// import LoadingLayer from '@/components/common/LoadingLayer';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';
import ButtonGroup from '@/components/common/ButtonGroup';
import UserService from '@/services/user';
import { userState } from '@/store/userAtom';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import ProfileImage from '@/components/profile/ProfileImage';
import { AxiosErrorResponseType } from '@/core/types/error/axios-error-response.type';

const genderOptions: GENDER[] = [...CONST_GENDER];

function ProfileEdit() {
  const user = useRecoilValue<UserType | null>(userState);
  const userInitialState = {
    nickname: user?.nickname,
    bio: user?.bio,
    gender: user?.gender,
  };
  const { formData: userUpdate, onChange } =
    useForm<UserUpdateType>(userInitialState);

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState([]);

  const { mutateAsync, isError } = useMutation(
    (formData: UserUpdateType) => {
      if (user?.id !== undefined) {
        return UserService.updateUser(user.id, formData);
      }
      return Promise.reject(new Error('유저 정보를 불러오지 못했습니다'));
    },
    {
      onSuccess: () => {
        router.back();
      },
      onError: (error: AxiosErrorResponseType) => {
        if (error?.response?.status === 404) {
          setErrorMessage(error?.response?.data.message);
        }
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

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>프로필 수정</TopHeader.Title>
        <TopHeader.Right>설정</TopHeader.Right>
      </TopHeader>
      <div className="profile-edit grid">
        {/* {isLoading && <LoadingLayer />} */}
        <div className="layout-container ">
          <div className="profile-info">
            <h2 className="profile-info__title">{user?.username}</h2>
            {user && <ProfileImage profile={user} />}
          </div>
          <div className="form-area">
            <form
              className="login-form"
              onSubmit={(event) => onSubmitForm(event, userUpdate)}
            >
              <div className="form-group">
                <div className="input-group">
                  <div className="input-field">
                    <input
                      type="text"
                      value={userUpdate.nickname}
                      name="nickname"
                      placeholder="닉네임"
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-field">
                    <input
                      type="text"
                      value={userUpdate.bio}
                      name="bio"
                      placeholder="자기소개"
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div>
                    <select
                      name="gender"
                      value={userUpdate.gender}
                      onChange={onChange}
                      className="select-box"
                    >
                      {genderOptions.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="select-option"
                        >
                          {genderTransformer(option)}
                        </option>
                      ))}
                    </select>
                  </div>
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
                    JSON.stringify(userUpdate) ===
                    JSON.stringify(userInitialState)
                  }
                >
                  EDIT
                </Button>
              </ButtonGroup>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
