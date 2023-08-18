import { useRouter } from 'next/router';

const ErrorPage = ({ statusCode }: any) => {
  const router = useRouter();

  return (
    <div>
      <h1>{statusCode}</h1>
      <p>에러가 발생하였습니다</p>
      <button onClick={() => router.push('/')}>Go Home</button>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
