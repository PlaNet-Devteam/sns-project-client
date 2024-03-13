import Link from 'next/link';

interface FeedHeaderProps {
  back?: string;
  backLink?: string;
  title: string;
  next?: string;
  nextColor?: boolean;
  nextLink?: string;
}

const FeedHeader = ({
  back,
  backLink,
  title,
  next,
  nextColor,
  nextLink,
}: FeedHeaderProps) => {
  return (
    <header className="feed-create-header">
      <Link href={backLink ? backLink : ''}>
        <span className="feed-create-header-back">{back}</span>
      </Link>
      <span className="feed-create-header-title">{title}</span>
      <Link href={nextLink ? nextLink : ''}>
        <span
          className={
            nextColor
              ? 'feed-create-header-next feed-create-header-next--color'
              : 'feed-create-header-next'
          }
        >
          {next}
        </span>
      </Link>
    </header>
  );
};
export default FeedHeader;
