import { useRouter } from 'next/router';
import Button from '@/components/common/Button';
import ButtonGroup from '@/components/common/ButtonGroup';
import NotFound from '@/assets/error/not_found.svg';

const ErrorPage = ({ statusCode }: any) => {
  const router = useRouter();

  return (
    <article className="error-page">
      <div className="inner">
        <span className="en-title">ERROR</span>
        <h1 className="title">{statusCode === 404 && <NotFound />}</h1>
        <p>페이지를 찾을 수 없습니다</p>
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

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
