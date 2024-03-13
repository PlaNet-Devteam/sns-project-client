import { useRouter } from 'next/router';
import { ErrorProps } from 'next/error';
import { NextPage, NextPageContext } from 'next';
import Button from '@/components/common/Button';
import ButtonGroup from '@/components/common/ButtonGroup';
import NotFound from '@/assets/error/not_found.svg';
import Error from '@/assets/error/error.svg';

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  const router = useRouter();

  return (
    <article className="error-page">
      <div className="inner">
        <span className="en-title">ERROR</span>
        {statusCode === 404 ? (
          <>
            <h1 className="title">
              <NotFound />
            </h1>
            <p>페이지를 찾을 수 없습니다</p>
          </>
        ) : (
          <>
            <h1 className="title">
              <Error />
            </h1>
            <p>잘못된 요청입니다 [{statusCode}]</p>
          </>
        )}
        <ButtonGroup>
          <Button
            variant="primary"
            size="sm"
            isEnglish
            onClick={() => router.push('/')}
          >
            GO HOME
          </Button>
        </ButtonGroup>
        <div className="astronaut"></div>
        <div className="spaceship"></div>
      </div>
    </article>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode: statusCode || 404 };
};

export default ErrorPage;
