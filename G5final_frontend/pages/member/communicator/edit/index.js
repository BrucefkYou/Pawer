import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import ComEdit from '@/components/pet/comEdit/ComEdit';
import Head from 'next/head';
ComEditIndex.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function ComEditIndex(props) {
  return (
    <>
      <Head>
        <title>寵物溝通師 - 溝通師資料編輯</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="PT-mydetail-edit">
        <ComEdit />
      </div>
    </>
  );
}
