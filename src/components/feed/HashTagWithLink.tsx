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
  const sentenceArray = description.split('\n').map((sentence) => {
    return (
      <>
        {sentence.split(' ').map((word: string, index: number) => {
          if (word.match(hashTagRegEx)) {
            return (
              <Link
                key={index}
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
              <>
                {word}
                &nbsp;
              </>
            );
          }
        })}
        <br />
      </>
    );
  });

  return <>{sentenceArray}</>;
};

export default HashTagWithLink;
