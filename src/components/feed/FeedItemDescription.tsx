import React from 'react';
import { FeedType } from '@/core';
import HashTagWithLink from './HashTagWithLink';
import styles from './FeedItemDescription.module.scss';

interface FeedItemDescriptionProps {
  item: FeedType;
}

const FeedItemDescription = ({ item }: FeedItemDescriptionProps) => {
  return (
    <>
      {item.description && (
        <div className={styles.description}>
          <span className={styles.username}>{item.user.username}</span>
          <HashTagWithLink description={item.description} />
        </div>
      )}
    </>
  );
};

export default FeedItemDescription;
