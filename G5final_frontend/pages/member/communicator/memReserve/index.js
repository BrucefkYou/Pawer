import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import MemReserve from '@/components/pet/memReserve/MemReserve';
MemReserveIndex.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function MemReserveIndex(props) {
  return (
    <>
      <div className="PT-reserve-card p-4 shadow">
        <MemReserve />
      </div>
    </>
  );
}
