import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CartFail(props) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Pawer寶沃 - 付款失敗</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="cart">
        <div className="container">
          {/* 付款失敗區塊 */}
          <section className="fail-block">
            <div>
              <svg
                width={80}
                height={80}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80ZM40 74C58.7777 74 74 58.7777 74 40C74 21.2223 58.7777 6 40 6C21.2223 6 6 21.2223 6 40C6 58.7777 21.2223 74 40 74ZM61.757 18.243C63.4143 19.9004 63.4143 22.5876 61.757 24.245L46.0019 40.0001L61.757 55.7552C63.4143 57.4125 63.4143 60.0997 61.757 61.7571C60.0996 63.4145 57.4124 63.4145 55.755 61.7571L39.9999 46.002L24.245 61.7569C22.5876 63.4143 19.9004 63.4143 18.243 61.7569C16.5857 60.0996 16.5857 57.4124 18.243 55.755L33.998 40.0001L18.243 24.2451C16.5857 22.5877 16.5857 19.9005 18.243 18.2432C19.9004 16.5858 22.5876 16.5858 24.245 18.2432L39.9999 33.9981L55.755 18.243C57.4124 16.5857 60.0996 16.5857 61.757 18.243Z"
                  fill="#C14545"
                />
              </svg>
            </div>
            <div>訂單失敗，請重新填寫資料</div>
            <div className="back-cart-block">
              <button
                className="back-cart-btn"
                onClick={() => {
                  router.push('/cart');
                }}
              >
                回到購物車
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
