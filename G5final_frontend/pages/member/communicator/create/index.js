import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import CreateCardOne from '@/components/pet/comCreate/CreateCardOne';
import CreateCardTwo from '@/components/pet/comCreate/CreateCardTwo';

ComCreateID.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function ComCreateID(props) {
  return (
    <>
      <div className="PT-create">
        <div className="container">
          {/* 第一張卡 */}
          <CreateCardOne />
          {/* 第二張卡 */}
          <CreateCardTwo />
        </div>
      </div>
    </>
  );
}
