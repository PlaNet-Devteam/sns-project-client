import Link from 'next/link';
import TypoText from '@/components/common/TypoText';

export const hashTagRegEx = /#[a-zA-Z가-힣0-9_]+/g;

export const genHashTagLink = (description: string) => {
  const wordsArray = description.split(' ');
  const descriptionWithLinks = wordsArray.map((word: string) => {
    if (word.match(hashTagRegEx)) {
      return (
        <Link key={word} href={`/explore/feed/tags/${word.slice(1)}`}>
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

  return descriptionWithLinks;
};
