import React from 'react';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { BiUserPin } from 'react-icons/bi';
import { useMutation } from '@tanstack/react-query';
import { userState } from '@/store/userAtom';
import useAuth from '@/hooks/useAuth';
import UserService from '@/services/user';
import TypoText from './TypoText';
import ButtonGroup from './ButtonGroup';
import Button from './Button';
import styles from './ActivateUser.module.scss';
import LoadingSpinner from './LoadingSpinner';

const ActivateUser = () => {
  const myInfo = useRecoilValue(userState);
  const { onLogout } = useAuth();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () => UserService.activateUser(),
    onSuccess: () => {
      alert('계정 삭제 처리가 취소 되었습니다. 재로그인 해주세요');
      onLogout();
    },
  });

  const onClickActivateHandler = () => {
    mutateAsync();
  };

  return (
    <div className={styles.activate}>
      <div className="inner__container">
        <div className="text-center">
          <BiUserPin size={'4rem'} color="white" />
          <TypoText color="white" tagName="h3">
            회원님은 현재 <br />
            <TypoText color="success" tagName="span">
              계정 삭제 처리 중
            </TypoText>
            입니다
          </TypoText>
          <br />
          <br />
          <TypoText color="white" tagName="h4">
            계정 삭제 요청일 :&nbsp;
            <TypoText color="success" tagName="span">
              {dayjs(myInfo?.inactiveAt).format('YYYY년 M월 D일')}
            </TypoText>
          </TypoText>
          <br />
          <br />
          <TypoText color="white" tagName="h5">
            회원님은 요청일로부터 7일간의 유예기간 동안에만 <br />
            계정 삭제 취소가 가능합니다
          </TypoText>
          <TypoText color="white" tagName="h5">
            [계정 삭제 취소] 후에는 정상적인 서비스 이용을 <br />
            위하여 다시 로그인 해주셔야 합니다
          </TypoText>
        </div>
        <ButtonGroup>
          <Button
            variant="primary"
            size="md"
            isFull
            onClick={onClickActivateHandler}
          >
            {isLoading ? (
              <LoadingSpinner variant="white" />
            ) : (
              <> 계정 삭제 취소</>
            )}
          </Button>
          <Button variant="secondary" size="md" isFull onClick={onLogout}>
            돌아가기
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ActivateUser;
