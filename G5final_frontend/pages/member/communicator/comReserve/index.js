import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import ComReserve from '@/components/pet/comReserve/ComReserve';
ComReserveIndex.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function ComReserveIndex(props) {
  
  return (
    <>
        <ComReserve/>
    </>
  );
};
