import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Image from 'next/image';
import PetDetail from '@/components/pet/pet-detail';
import { useRouter } from 'next/router';

export default function Id(props) {
  const router = useRouter();

  const handleBack = () => {
    router.push('/communicator'); // 替換為目標頁面的路徑
  };
  return (
    <>
      <div className="PT-detail">
        <div className="container">
          <div className="pet-detail-yen">
            {/* 麵包屑 */}
            <Breadcrumbs />
            <PetDetail />
            {/* 按鈕 */}
            <div className="row py-5">
              <div className="col btn-rwd-none">
                <button className="btnn" onClick={handleBack}>
                  ←返回列表
                </button>
              </div>
              <div className="col btn-rwd-flex">
                <button className="btnn">預約寵物溝通師</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
