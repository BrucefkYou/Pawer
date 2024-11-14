import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import PetDetail from '@/components/pet/communicatorDetail/PetDetail';

export default function communicatorDetailIndex(props) {
  return (
    <>
      <Head>
        <title>Pawer寶沃 - 寵物溝通師明細</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="PT-detail">
        <div className="container">
          <div className="pet-detail-yen">
            {/* 麵包屑 */}
            <Breadcrumbs />
            <PetDetail />
          </div>
        </div>
      </div>
    </>
  );
}
