import Link from 'next/link';
import React from 'react';
import { hashTagRegEx } from '@/utils/generateHashTag';
import TypoText from '../common/TypoText';
import styles from './HashTagWithLink.module.scss';

interface HashTagWithLinkProps {
  description: string;
}

const HashTagWithLink = ({
  description,
}: HashTagWithLinkProps): JSX.Element => {
  const wordsArray = description.split(' ');
  const descriptionWithLinks = wordsArray.map((word: string, index: number) => {
    if (word.match(hashTagRegEx)) {
      return (
        <Link
          key={index}
          href={`/explore/feed/tags/${word.slice(1)}`}
          className={styles.tag}
        >
          <TypoText tagName="span" color="essential">
            &nbsp;
            {word}
            &nbsp;
          </TypoText>
        </Link>
      );
    } else {
      return word;
    }
  });

  return <>{descriptionWithLinks}</>;
};

export default HashTagWithLink;
