import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import useForm from '@/hooks/useForm';
import { AuthLoginType } from '@/core/types/auth';
import JwtStorageService, { ACCESS_TOKEN } from '@/core/utils/jwt-storage';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import AuthService from '@/services/auth';
import Button from '@/components/common/Button';
import ButtonGroup from '@/components/common/ButtonGroup';
import IconGoogle from '@/assets/icons/icon_google.svg';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Login = () => {
  const {
    formData: authLogin,
    onChange,
    onReset,
  } = useForm<AuthLoginType>({
    email: '',
    password: '',
    rememberMe: true,
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState([]);
  const [_, setUsername] = useLocalStorage<string>('username', '');

  const { mutateAsync, isLoading, isError } = useMutation(
    (formData: AuthLoginType) => AuthService.login(formData),
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: AuthLoginType,
  ) => {
    event.preventDefault();
    try {
      const { accessToken, userInfo } = await mutateAsync(formData);
      if (accessToken) {
        JwtStorageService.setToken(ACCESS_TOKEN, `${accessToken}`);
        setUsername(userInfo.username);
        onReset();
        router.replace('/feed');
      }
    } catch (error: any) {
      console.log('error?.response', error?.response);
      setErrorMessage(error?.response?.data.message);
    }
  };

  return (
    <div className="login grid">
      {/* {isLoading && <LoadingSpinner />} */}
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
              onSubmit={(event) => onSubmitForm(event, authLogin)}
            >
              <div className="form-group">
                <div className="input-group">
                  <div className="input-field">
                    <input
                      type="text"
                      value={authLogin.email}
                      name="email"
                      placeholder="이메일"
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-field">
                    <input
                      type="password"
                      name="password"
                      value={authLogin.password}
                      placeholder="비밀번호"
                      onChange={onChange}
                      autoComplete="off"
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
                  LOGIN
                </Button>
              </ButtonGroup>
            </form>

            <div className="text-group">
              <p className=" text-center text-white text-sm">
                비밀번호를 잊으셨나요?
              </p>
            </div>
          </div>
        </div>
        <div className="bottom-area">
          <div className="text-group">
            <p className=" text-center text-white text-sm">
              <span>계정이 없으신가요?</span>
              <Link href="/signup" className="text-link">
                가입하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
