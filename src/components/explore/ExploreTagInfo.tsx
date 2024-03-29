import { useRouter } from 'next/router';
import React from 'react';
import { FeedType } from '@/core';
import FeedService from '@/services/feed';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import useAuth from '@/hooks/useAuth';
import TypoText from '../common/TypoText';
import BaseImage from '../common/img/BaseImage';
import styles from './ExploreTagInfo.module.scss';

const ExploreTagInfo = () => {
  const router = useRouter();
  const { payload } = useAuth();

  const { data: feeds } = useInfinityScroll<FeedType>(
    ['tagInfo', router.query.tagName],
    (page) => {
      if (!payload) {
        return FeedService.getFeedsByTags({
          page,
          limit: 9,
          tagName: router.query.tagName as string,
        });
      } else {
        return FeedService.getFeeds({
          page,
          limit: 9,
          tagName: router.query.tagName as string,
          viewerId: payload?._id,
        });
      }
    },
  );

  return (
    <div className={styles.info}>
      {feeds?.pages[0].items[0] && (
        <div className={styles.image}>
          <BaseImage
            src={`${feeds?.pages[0].items[0].feedImages[0].image}`}
            width={120}
            height={120}
            alt={`#${router.query.tagName} 이미지`}
          />
        </div>
      )}
      <div>
        <TypoText color="white" tagName="h3">
          # {router.query.tagName}
        </TypoText>
        <TypoText color="white">게시물 {feeds?.pages[0].totalCount}</TypoText>
      </div>
    </div>
  );
};

export default ExploreTagInfo;
