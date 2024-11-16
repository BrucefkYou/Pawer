import React from 'react';
import Head from 'next/head';

// Components
import Banner from '@/components/join/banner/banner';
import BlogList from '@/components/blog/blog-list';

export default function Blogindex() {
  return (
    <>
      <Head>
        <title>Pawer寶沃-部落格專區</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bl-list">
        <Banner bgImgUrl="/blog/blog-banner.svg" imgCover='none' />
        <BlogList />
      </div>
    </>
  );
}
