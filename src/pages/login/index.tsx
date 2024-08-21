import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useGoogleLogin } from '@react-oauth/google';
import { AxiosError } from 'axios';
import useForm from '@/hooks/useForm';
import { AuthLoginType } from '@/core/types/auth';
import JwtStorageService, { ACCESS_TOKEN } from '@/core/utils/jwt-storage';
import ErrorMessage from '@/components/common/ErrorMessage';
import AuthService from '@/services/auth';
import Button from '@/components/common/Button';
import ButtonGroup from '@/components/common/ButtonGroup';
import IconGoogle from '@/assets/icons/icon_google.svg';
import { userState } from '@/store/userAtom';
import InputField from '@/components/common/form/InputField';
import LoadingLayer from '@/components/common/LoadingLayer';

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
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const setUser = useSetRecoilState(userState);

  const {
    mutateAsync: googleLogoinMutation,
    isSuccess: isSuccessGoogleLogin,
    isLoading: isLoadingGoogleLogin,
  } = useMutation((code: string) => {
    return AuthService.loginGoogle(code);
  });

  const googleSocialLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const { accessToken, userInfo } = await googleLogoinMutation(code);
      if (accessToken) {
        JwtStorageService.setToken(ACCESS_TOKEN, `${accessToken}`);
        setUser(userInfo);
        router.reload();
        if (isSuccessGoogleLogin) {
          router.replace('/feed');
        }
      }
    },
  });

  const { mutateAsync, isError, isSuccess, isLoading } = useMutation(
    (formData: AuthLoginType) => {
      return AuthService.login(formData);
    },
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<Element, MouseEvent>,
    formData: AuthLoginType,
    guest?: boolean,
  ) => {
    event.preventDefault();
    try {
      if (guest) {
        authLogin.email = 'guest@gmail.com';
        authLogin.password = 'test1234#';
      }
      const { accessToken, userInfo } = await mutateAsync(formData);
      if (accessToken) {
        JwtStorageService.setToken(ACCESS_TOKEN, `${accessToken}`);
        setUser(userInfo);
        router.reload();
        if (isSuccess) {
          router.replace('/feed');
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  const isShowLoadingLayer =
    (!isSuccessGoogleLogin && isLoadingGoogleLogin) ||
    (!isSuccess && isLoading);

  return (
    <>
      {isShowLoadingLayer && <LoadingLayer />}
      <div className="login grid">
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
                  onClick={googleSocialLogin}
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
                    <InputField
                      type="text"
                      value={authLogin.email}
                      name="email"
                      placeholder="이메일"
                      onChange={onChange}
                      onReset={onReset}
                    />
                  </div>
                  <div className="input-group">
                    <InputField
                      type="password"
                      name="password"
                      value={authLogin.password}
                      placeholder="비밀번호"
                      onChange={onChange}
                      onReset={onReset}
                      autoComplete="off"
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
                    LOGIN
                  </Button>
                  <Button
                    size="md"
                    variant="secondary"
                    type="button"
                    isEnglish
                    isFull
                    onClick={(event) => onSubmitForm(event, authLogin, true)}
                  >
                    GUEST LOGIN
                  </Button>
                </ButtonGroup>
              </form>
              <div className="text-group">
                {/* <p className=" text-center text-white text-sm">
                  비밀번호를 잊으셨나요?
                </p> */}
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
    </>
  );
};

export default Login;
