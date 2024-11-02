import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
Index.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Index(props) {
  return (
    <>
      <div>index</div>
    </>
  );
}
