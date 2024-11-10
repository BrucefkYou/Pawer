import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import ComEdit from '@/components/pet/comEdit/ComEdit';
ComEditIndex.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function ComEditIndex(props) {
  
  return (
    <><div className="PT-mydetail-edit">
      <ComEdit/>
    </div>
    </>
    )
}
