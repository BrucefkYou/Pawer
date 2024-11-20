import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MemberLayout from '@/components/layout/member-layout';
import MemReserve from '@/components/pet/memReserve/MemReserve';
MemReserveIndex.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function MemReserveIndex(props) {
  return (
    <>
      <Head>
        <title>寵物溝通師 - 會員預約清單</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MemReserve />
    </>
  );
}
