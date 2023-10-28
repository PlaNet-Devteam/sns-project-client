import React from 'react';
import { BsFillShieldLockFill } from 'react-icons/bs';
import Link from 'next/link';
import TypoText from './TypoText';
import styles from './InactivatedUser.module.scss';

const InactivatedUser = () => {
  return (
    <div className={styles.inactivated_user}>
      <BsFillShieldLockFill color="gray" />
      <TypoText tagName="p" color="gray">
        비공개 계정입니다
        <br />
        피드를 보려면
        <Link href="/login" className="text-link">
          로그인 하세요
        </Link>
      </TypoText>
    </div>
  );
};

export default InactivatedUser;
