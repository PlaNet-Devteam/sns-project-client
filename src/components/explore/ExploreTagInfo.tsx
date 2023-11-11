import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import { FeedType } from '@/core';
import FeedService from '@/services/feed';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import TypoText from '../common/TypoText';
import styles from './ExploreTagInfo.module.scss';

const ExploreTagInfo = () => {
  const router = useRouter();
  const { data: feeds } = useInfinityScroll<FeedType>(
    ['tagInfo', router.query.tagName],
    () =>
      FeedService.getFeedsByTag({
        page: 1,
        limit: 9,
        tagName: router.query.tagName as string,
      }),
  );

  return (
    <div className={styles.info}>
      {feeds?.pages[0].items[0] && (
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${feeds?.pages[0].items[0].feedImages[0].image}`}
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
