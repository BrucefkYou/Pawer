import React, { useState, useEffect } from 'react';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import { useRouter } from 'next/router';

export default function JiCreateCta(props) {
  return (
    <>
      <SideBarCard content={<div>創建</div>} />
    </>
  );
}
