import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import useForm from '@/hooks/useForm';
import { api } from '@/core/base.service';
import { AuthLoginType } from '@/core/types/auth';
import JwtStorageService from '@/core/utils/jwt-storage';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

function Login() {
  const {
    formData: authLogin,
    onChange,
    onReset,
  } = useForm<AuthLoginType>({
    email: '',
    password: '',
    rememberMe: true,
  });

  // const {
  //   formData: authLogin,
  //   onChange,
  //   onReset,
  // } = useForm(new AuthLoginDto());

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState([]);

  // TODO : API 함수 호출하는 부분 서비스 관심사 분리
  const createUser = async (formData: AuthLoginType) => {
    const { data } = await api.post('/auth/login', formData);
    return data.data;
  };

  const { mutateAsync, isLoading, isError } = useMutation(
    (formData: AuthLoginType) => createUser(formData),
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: AuthLoginType,
  ) => {
    event.preventDefault();
    try {
      const { accessToken } = await mutateAsync(formData);
      if (accessToken) {
        JwtStorageService.setToken(accessToken);
        onReset();
        router.replace('/profile');
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data.message);
    }
  };
  isLoading;
  return (
    <div className="login">
      {isLoading && <LoadingSpinner />}
      <div className="container content-area">
        <div className="middle-area form-area">
          <div>
            <div className="sns-login">
              <button className="btn btn-sm btn-ghost">
                Google 계정으로 로그인
              </button>
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
                    />
                  </div>
                </div>
              </div>
              {isError && <ErrorMessage errorMessage={errorMessage} />}
              <div className="btn-group">
                <button className="btn btn-primary btn-md en" type="submit">
                  LOGIN
                </button>
              </div>
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
              계정이 없으신가요?
              <Link href="/signup" className="text-link">
                가입하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
