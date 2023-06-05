import React, { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { UserType, UserUpdateType } from '@/core';
import useForm from '@/hooks/useForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';
import ButtonGroup from '@/components/common/ButtonGroup';
import UserService from '@/services/user';
import { userState } from '@/store/userAtom';

const ProfileEdit = () => {
  const user = useRecoilValue<UserType | null>(userState);

  const { formData: userUpdate, onChange } = useForm<UserUpdateType>({
    nickname: user?.nickname,
    bio: user?.bio,
    gender: user?.gender,
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState([]);

  console.log('user', user);

  const { mutateAsync, isLoading, isError } = useMutation(
    (formData: UserUpdateType) => UserService.updateUser(1, formData),
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: UserUpdateType,
  ) => {
    event.preventDefault();
    try {
      await mutateAsync(formData);
      router.push('/signup/complete');
    } catch (error: any) {
      console.log('error?.response', error?.response);
      setErrorMessage(error?.response?.data.message);
    }
  };

  const onChangeImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(event.target.files && event.target.files[0]);
  };

  return (
    <div className="signup grid">
      {isLoading && <LoadingSpinner />}
      <div className="layout-container content-area">
        <div className="middle-area">
          <div className="form-area">
            <form
              className="login-form"
              onSubmit={(event) => onSubmitForm(event, userUpdate)}
            >
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="profile_image"
                  onChange={onChangeImageHandler}
                />
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-field">
                    <input
                      type="text"
                      value={userUpdate.nickname}
                      name="nickname"
                      placeholder="닉네임"
                      onChange={onChange}
                      defaultValue={user?.nickname}
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
                      defaultValue={user?.bio}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-field">
                    <input
                      type="text"
                      value={userUpdate.gender}
                      name="gender"
                      placeholder="성별"
                      onChange={onChange}
                      defaultValue={user?.gender}
                    />
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
                >
                  EDIT
                </Button>
              </ButtonGroup>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
