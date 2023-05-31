import axios from 'axios';
import type { InferGetServerSidePropsType } from 'next';

interface Feed {
  id: string;
  description: string;
  likeCount: number;
  commentCount: number;
  feedImage: string[];
  comment: string[];
  tag: string[];
}

const Example = ({
  feeds,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      {feeds &&
        feeds.map((feed: Feed) => (
          <div key={feed.id}>
            <p>{'id: ' + feed.id}</p>
            <p>{'description: ' + feed.description}</p>
            <p>{'likeCount: ' + feed.likeCount}</p>
            <p>{'commentCount: ' + feed.commentCount}</p>
            <br />
          </div>
        ))}
    </>
  );
};

export async function getServerSideProps() {
  const res = await axios.get('https://example.com/feeds');
  const feeds: Feed[] = res.data?.data.items;

  return {
    props: {
      feeds,
    },
  };
}

export default Example;
