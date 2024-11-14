import React, { useState, useEffect } from 'react';
import Banner from '@/components/join/banner/banner';
import PetAdvertise from '@/components/pet/communicator/Advertise';
import PetIndex from '@/components/pet/communicator/PetIndex';

export default function communicatorIndex(props) {
  return (
    <>
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
