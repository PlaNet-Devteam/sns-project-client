import React from 'react';
import { FeedType, YN } from '@/core';
import FeedItemActionButtons from './FeedItemActionButtons';
import FeedItemCountInfo from './FeedItemCountInfo';
import FeedItemDescription from './FeedItemDescription';
import styles from './FeedItemDetailContent.module.scss';

interface FeedItemDetailContentProps {
  item: FeedType;
}

const FeedItemDetailContent = ({ item }: FeedItemDetailContentProps) => {
  return (
    <div className={styles.content}>
      <div className="inner__container">
        <div className="row-box">
          <FeedItemActionButtons item={item} />
        </div>
        {(item.showLikeCountYn === YN.Y || item.commentCount > 0) && (
          <div className="row-box">
            <FeedItemCountInfo item={item} />
          </div>
        )}
        <div className="row-box">
          {item.description && <FeedItemDescription item={item} />}
        </div>
      </div>
    </div>
  );
};

export default FeedItemDetailContent;
