import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import Link from 'next/link';
import { BsCheckCircle } from "react-icons/bs";
Message.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function Message(props) {
  return (
    <>
      <div className="message-card">
        <div className="pic mb-4">
          <BsCheckCircle style={{fontSize:'80px', color:'green'}}/>
        </div>
        <h3>取消預約成功！</h3>
        <p>期待下次光臨</p>
        <p className="text1">其餘問題可洽客服</p>
        <Link href={'/member/communicator/comReserve'} className="message-btn">返回預約列表</Link>
      </div>
    </>
  );
}
