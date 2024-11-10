import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
Message.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function Message(props) {
  return (
    <>
      <div className="message-card">
        <div className="pic mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={80}
            height={80}
            viewBox="0 0 80 80"
            fill="none"
          >
            <path
              d="M56.6667 60V70M56.6667 50H56.7001M43.3334 10V24.6667C43.3334 26.5335 43.3334 27.4669 43.6967 28.18C44.0164 28.8072 44.5261 29.3171 45.1534 29.6367C45.8664 30 46.7997 30 48.6667 30H63.3334M43.3334 10H27.3334C23.5997 10 21.7329 10 20.3068 10.7266C19.0524 11.3658 18.0325 12.3856 17.3934 13.6401C16.6667 15.0661 16.6667 16.933 16.6667 20.6667V59.3333C16.6667 63.067 16.6667 64.934 17.3934 66.36C18.0325 67.6143 19.0524 68.6343 20.3068 69.2733C21.7329 70 23.5997 70 27.3334 70H43.3334M43.3334 10L63.3334 30M63.3334 30V38.3333"
              stroke="#F4B13E"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3>感謝您的註冊，已收到！</h3>
        <p>案件已在處理中 , 約7~10個工作天完成</p>
        <p className="text1">其餘問題可洽客服專線</p>
        <button className="message-btn">返回首頁</button>
      </div>
    </>
  );
}
