import React from 'react';
import { BsFillShieldLockFill } from 'react-icons/bs';
import Link from 'next/link';
import { useRecoilStateLoadable, useRecoilValue } from 'recoil';
import { userState } from '@/store/userAtom';
import TypoText from './TypoText';
import styles from './InactivatedUser.module.scss';

const InactivatedUser = () => {
  const myInfo = useRecoilValue(userState);

  return (
    <div className={styles.inactivated_user}>
      <BsFillShieldLockFill color="gray" />
      <TypoText tagName="p" color="gray">
        비공개 계정입니다
        <br />
        피드를 보려면
        {myInfo ? (
          <> 팔로우하세요</>
        ) : (
          <Link href="/login" className="text-link">
            로그인 하세요
          </Link>
        )}
      </TypoText>
    </div>
  );
};

export default InactivatedUser;
