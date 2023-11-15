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
  const sentenceArray = description.split('\n').map((sentence, index) => {
    return (
      <span key={index}>
        {sentence.split(' ').map((word: string, index2: number) => {
          if (word.match(hashTagRegEx)) {
            return (
              <Link
                key={index2}
                href={`/explore/feed/tags/${word.slice(1)}`}
                className={styles.tag}
              >
                <TypoText tagName="span" color="essential">
                  {word}
                  &nbsp;
                </TypoText>
              </Link>
            );
          } else {
            return (
              <span key={index2}>
                {word}
                &nbsp;
              </span>
            );
          }
        })}
        <br />
      </span>
    );
  });

  return <>{sentenceArray}</>;
};

export default HashTagWithLink;
