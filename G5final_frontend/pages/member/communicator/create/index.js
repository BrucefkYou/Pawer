import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import CreatCard from '@/components/pet/comCreate/CreatCard';
ComCreateID.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function ComCreateID(props) {
  return (
    <>
      <div className="PT-create">
        <div className="container">
          <CreatCard/>
        </div>
      </div>
    </>
  );
}
