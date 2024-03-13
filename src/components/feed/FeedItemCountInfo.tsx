import React from 'react';
import { FeedType, YN } from '@/core';
import TypoText from '../common/TypoText';
import styles from './FeedItemCountInfo.module.scss';

interface FeedItemCountInfoProps {
  item: FeedType;
}

const FeedItemCountInfo = ({ item }: FeedItemCountInfoProps) => {
  return (
    <div className={styles.info}>
      {item.showLikeCountYn === YN.Y && (
        <TypoText color="white" tagName="span">
          좋아요 {item.likeCount}개
        </TypoText>
      )}
      {item.commentCount > 0 && (
        <TypoText color="white" tagName="span">
          댓글 {item.commentCount}개
        </TypoText>
      )}
    </div>
  );
};

export default FeedItemCountInfo;
