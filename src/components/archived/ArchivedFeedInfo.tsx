import React from 'react';
import TypoText from '../common/TypoText';
import styles from './ArchivedFeedInfo.module.scss';

const ArchivedFeedInfo = () => {
  return (
    <div className={styles.info}>
      <TypoText color="white" tagName="p">
        보관함 게시물은 회원님만 볼 수 있습니다
      </TypoText>
    </div>
  );
};

export default ArchivedFeedInfo;
