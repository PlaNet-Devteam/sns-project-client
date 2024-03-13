import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import useForm from '@/hooks/useForm';
import { GENDER, USER_STATUS, UserCreateType } from '@/core';
import ErrorMessage from '@/components/common/ErrorMessage';
import UserService from '@/services/user';
import Button from '@/components/common/Button';
import ButtonGroup from '@/components/common/ButtonGroup';
import IconGoogle from '@/assets/icons/icon_google.svg';
import InputField from '@/components/common/form/InputField';
import LoadingLayer from '@/components/common/LoadingLayer';

const SignUp = () => {
  const {
    formData: userCreate,
    onChange,
    onReset,
  } = useForm<UserCreateType>({
    email: '',
    username: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    status: USER_STATUS.ACTIVE,
    bio: '',
    gender: GENDER.NO_ANSWER,
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState([]);

  const { mutateAsync, isError, isLoading } = useMutation(
    (formData: UserCreateType) => UserService.createUser(formData),
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: UserCreateType,
  ) => {
    event.preventDefault();
    try {
      await mutateAsync(formData);
      router.push('/signup/complete');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <div className="signup grid">
      {isLoading && <LoadingLayer />}
      <div className="layout__container content-area">
        <div className="middle-area">
          <div className="form-area">
            <div className="sns-login">
              <Button
                size="sm"
                color="white"
                variant="ghost"
                type="button"
                isFull
              >
                <IconGoogle />
                Google 계정으로 로그인
              </Button>
            </div>
            <form
              className="login-form"
              onSubmit={(event) => onSubmitForm(event, userCreate)}
            >
              <div className="form-group">
                <div className="input-group">
                  <InputField
                    type="email"
                    value={userCreate.email}
                    name="email"
                    placeholder="이메일"
                    onChange={onChange}
                    onReset={onReset}
                  />
                </div>
                <div className="input-group">
                  <InputField
                    type="text"
                    value={userCreate.username}
                    name="username"
                    placeholder="사용자명"
                    onChange={onChange}
                    onReset={onReset}
                  />
                </div>
                <div className="input-group">
                  <InputField
                    type="text"
                    value={userCreate.nickname}
                    name="nickname"
                    placeholder="닉네임"
                    onChange={onChange}
                    onReset={onReset}
                  />
                </div>
                <div className="input-group">
                  <InputField
                    type="password"
                    name="password"
                    value={userCreate.password}
                    placeholder="비밀번호"
                    onChange={onChange}
                    autoComplete="off"
                    onReset={onReset}
                  />
                </div>
                <div className="input-group">
                  <InputField
                    type="password"
                    name="passwordConfirm"
                    value={userCreate.passwordConfirm}
                    placeholder="비밀번호 확인"
                    onChange={onChange}
                    autoComplete="off"
                    onReset={onReset}
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
                >
                  SIGN UP
                </Button>
              </ButtonGroup>
            </form>
          </div>
        </div>
        <div className="bottom-area">
          <div className="text-group">
            <p className=" text-center text-white text-sm">
              <span>이미 계정이 있으신가요?</span>
              <Link href="/login" className="text-link">
                로그인하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
