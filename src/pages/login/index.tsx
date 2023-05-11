import React, { FormEvent } from 'react';
import Link from 'next/link';
import useForm from '@/hooks/useForm';
import { AuthLoginDto, AuthLoginType } from '@/common/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { api } from '@/components/Layouts/BaseLayout';

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

  const { mutateAsync, isLoading } = useMutation((formData: AuthLoginDto) =>
    api.post('/auth/login', formData),
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: AuthLoginDto,
  ) => {
    event.preventDefault();
    try {
      const res = await mutateAsync(formData);
      console.log(res);
      if (res.data.data) {
        localStorage.setItem('accessToken', res.data.data.accessToken);
        localStorage.setItem('refreshToken', res.data.data.refreshToken);
        onReset();
        router.push('/profile');
      }
    } catch (error) {
      console.error(error);
    }
  };
  isLoading;
  return (
    <div className="login">
      <div>{isLoading && <div>로딩중................</div>}</div>
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
