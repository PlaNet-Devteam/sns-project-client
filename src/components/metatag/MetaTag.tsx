import Head from 'next/head';
import React from 'react';

interface MetaTagProps {
  title: string;
  url: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const MetaTag = ({
  title,
  url,
  description,
  keywords,
  image,
}: MetaTagProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph 메타 태그 */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
    </Head>
  );
};

export default MetaTag;
