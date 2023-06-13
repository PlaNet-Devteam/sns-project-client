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
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';
import ButtonGroup from '@/components/common/ButtonGroup';
import UserService from '@/services/user';
import { userState } from '@/store/userAtom';
import TopHeader from '@/components/nav/topHeader/TopHeader';

const genderOptions = [...CONST_GENDER];

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

  const { mutateAsync, isLoading, isError } = useMutation(
    (formData: UserUpdateType) => {
      if (user?.id !== undefined) {
        return UserService.updateUser(user.id, formData);
      }
      return Promise.reject(new Error('유저 정보를 불러오지 못했습니다'));
    },
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: UserUpdateType,
  ) => {
    event.preventDefault();
    try {
      await mutateAsync(formData);
      router.push('/profile');
    } catch (error: any) {
      console.log('error?.response', error?.response);
      setErrorMessage(error?.response?.data.message);
    }
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
        {isLoading && <LoadingSpinner />}
        <div className="layout-container content-area">
          <div className="middle-area">
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
      </div>
    </>
  );
}

export default ProfileEdit;
function uesMemo(
  arg0: {
    nickname: string | undefined;
    bio: string | undefined;
    gender: GENDER | undefined;
  },
  arg1: never[],
) {
  throw new Error('Function not implemented.');
}
