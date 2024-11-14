import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Banner from '@/components/join/banner/banner';
import PetAdvertise from '@/components/pet/communicator/Advertise';
import PetIndex from '@/components/pet/communicator/PetIndex';

export default function communicatorIndex(props) {
  return (
    <>
      <Head>
        <title>Pawer寶沃 - 寵物溝通師</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="PT-list">
        {/* banner */}
        <Banner bgImgUrl="/pet/images/Banner.jpg" ImgCover="cover" />
        {/* 主要內容 */}
        <PetIndex />
        {/* 廣告 */}
        <PetAdvertise />
      </div>
    </>
  );
}
