import Head from 'next/head';

import IntroVisual from '@/components/Intro/IntroVisual';

export default function Home() {
  return (
    <>
      <Head>
        <title>PlaNet</title>
        <meta name="description" content="우주 테마 소셜 네트워크" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IntroVisual />
    </>
  );
}
