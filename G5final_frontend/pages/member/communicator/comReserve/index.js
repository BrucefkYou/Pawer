import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MemberLayout from '@/components/layout/member-layout';
import ComReserve from '@/components/pet/comReserve/ComReserve';
ComReserveIndex.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function ComReserveIndex(props) {
  return (
    <>
      <Head>
        <title>寵物溝通師 - 師資預約清單</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ComReserve />
    </>
  );
}
