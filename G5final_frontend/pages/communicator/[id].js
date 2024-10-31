import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import PetDetail from '@/components/pet/pet-detail';

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
          </div>
        </div>
      </div>
    </>
  );
}
