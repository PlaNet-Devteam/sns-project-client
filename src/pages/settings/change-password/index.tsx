import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import SettingsHeader from '@/components/settings/SettingsHeader';
import useForm from '@/hooks/useForm';
import { ChangePasswordType } from '@/core';
import AuthService from '@/services/auth';
import ErrorMessage from '@/components/common/ErrorMessage';
import ButtonGroup from '@/components/common/ButtonGroup';
import Button from '@/components/common/Button';
import InputField from '@/components/common/form/InputField';

const ChagePassword = () => {
  const router = useRouter();
  const {
    formData: passwordUpdate,
    onChange,
    onReset,
  } = useForm<ChangePasswordType>({
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const [errorMessage, setErrorMessage] = useState([]);

  const { mutateAsync, isError } = useMutation((formData: ChangePasswordType) =>
    AuthService.changePassword(formData),
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: ChangePasswordType,
  ) => {
    event.preventDefault();
    try {
      await mutateAsync(formData);
      router.back();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>비밀번호 변경</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <SettingsHeader>
            <SettingsHeader.Title>비밀번호 변경</SettingsHeader.Title>
            <SettingsHeader.Desc>
              비밀번호는 8자 이상이어야 하고 영문, 숫자, <br />
              특수문자 (!$@#%) 최소 1개이상 포함해야 합니다
            </SettingsHeader.Desc>
          </SettingsHeader>
          <form
            className="login-form"
            onSubmit={(event) => onSubmitForm(event, passwordUpdate)}
          >
            <div className="form-group">
              <div className="input-group">
                <InputField
                  type="password"
                  name="password"
                  value={passwordUpdate.password}
                  placeholder="현재 비밀번호"
                  onChange={onChange}
                  autoComplete="off"
                  onReset={onReset}
                />
              </div>
              <div className="input-group">
                <InputField
                  type="password"
                  name="newPassword"
                  value={passwordUpdate.newPassword}
                  placeholder="새 비밀번호"
                  onChange={onChange}
                  autoComplete="off"
                  onReset={onReset}
                />
              </div>
              <div className="input-group">
                <InputField
                  type="password"
                  name="newPasswordConfirm"
                  value={passwordUpdate.newPasswordConfirm}
                  placeholder="새 비밀번호 확인"
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
                OK
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </article>
    </>
  );
};

export default ChagePassword;
