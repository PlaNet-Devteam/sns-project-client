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
        {sentence.split(' ').map((word: string) => {
          if (word.match(hashTagRegEx)) {
            return (
              <Link
                key={word}
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
              <span key={word}>
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
