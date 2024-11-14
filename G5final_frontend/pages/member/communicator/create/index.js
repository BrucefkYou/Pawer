import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MemberLayout from '@/components/layout/member-layout';
import CreatCard from '@/components/pet/comCreate/CreatCard';
ComCreateID.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function ComCreateID(props) {
  return (
    <>
      <Head>
        <title>寵物溝通師 - 師資註冊</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="PT-create">
        <div className="container">
          <CreatCard />
        </div>
      </div>
    </>
  );
}
