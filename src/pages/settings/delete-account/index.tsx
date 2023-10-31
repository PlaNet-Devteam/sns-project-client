import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import SettingsHeader from '@/components/settings/SettingsHeader';
import useForm from '@/hooks/useForm';
import ErrorMessage from '@/components/common/ErrorMessage';
import ButtonGroup from '@/components/common/ButtonGroup';
import Button from '@/components/common/Button';
import UserService from '@/services/user';
import { AxiosErrorResponseType, UserDeleteType } from '@/core';
import Dialog from '@/components/dialog/Dialog';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TypoText from '@/components/common/TypoText';
import useAuth from '@/hooks/useAuth';

const DeleteAccount = () => {
  const router = useRouter();
  const { onLogout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: (formData: UserDeleteType) => UserService.deleteUser(formData),
    onSuccess: () => {
      setIsModalOpen(false);
      onLogout();
    },
    onError: (error: AxiosErrorResponseType) => {
      setErrorMessage(error?.response?.data.message);
    },
  });

  const { formData: accountDelete, onChange } = useForm<UserDeleteType>({
    password: '',
  });

  const onClickDeleteUserHandler = (formData: UserDeleteType) => {
    mutateAsync(formData);
  };

  const onClickModalOpenHandler = (event?: FormEvent) => {
    event?.preventDefault();
    setIsModalOpen((prevStatus) => !prevStatus);
  };

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>계정 삭제</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <SettingsHeader>
            <SettingsHeader.Title>계정 삭제</SettingsHeader.Title>
            <SettingsHeader.Desc>
              회원을 탈퇴할 경우, 계정 상태가 비활성화 되며 <br />
              7일 이후에는 계정이 영구 삭제되고, 로그인이
              <br /> 불가능하게 됩니다 <br />
              <br />
              탈퇴 철회를 원하시면 7일 이내에 재 로그인하면 <br />
              계정 상태가 활성화 됩니다
            </SettingsHeader.Desc>
          </SettingsHeader>
          <form className="form" onSubmit={onClickModalOpenHandler}>
            <div className="form-group">
              <div className="input-group">
                <div className="input-field">
                  <input
                    type="password"
                    name="password"
                    value={accountDelete.password}
                    placeholder="현재 비밀번호"
                    onChange={onChange}
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
                OK
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </article>
      <Dialog isOpen={isModalOpen}>
        <Dialog.Dimmed onClick={onClickModalOpenHandler} />
        <Dialog.Content>
          <div className="text-center">
            <TypoText tagName="p" color="white">
              계정을 삭제할까요?
            </TypoText>
          </div>
        </Dialog.Content>
        <Dialog.LabelButton
          color="danger"
          onClick={() => onClickDeleteUserHandler(accountDelete)}
        >
          {isLoading ? (
            <>
              <LoadingSpinner variant="white" />
            </>
          ) : (
            <>삭제하기</>
          )}
        </Dialog.LabelButton>
        <Dialog.LabelButton
          color="white"
          onClick={() => onClickModalOpenHandler()}
        >
          취소
        </Dialog.LabelButton>
      </Dialog>
    </>
  );
};

export default DeleteAccount;
