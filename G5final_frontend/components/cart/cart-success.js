import Link from 'next/link';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart/use-cart-state';
import { useRouter } from 'next/router';

export default function Success(props) {
  const { cart, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');
  const router = useRouter();

  useEffect(() => {
    clearCart();
    localStorage.removeItem('store7-11');
    localStorage.removeItem('discount');
    if (router.query.CustomField4) {
      setOrderNumber(router.query.CustomField4);
    } else {
      setOrderNumber(router.query.orderID);
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Pawer寶沃 - 付款成功</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="cart">
        <main>
          <div className="container">
            {/* 付款成功區塊 */}
            <section className="success-block">
              <div>
                <svg
                  width={80}
                  height={81}
                  viewBox="0 0 80 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M63.9607 25.5432C65.5937 27.0309 65.7115 29.5609 64.2237 31.1939L35.5557 62.6606C34.7675 63.5258 33.6399 64.0023 32.4701 63.9646C31.3002 63.9269 30.2056 63.3788 29.4747 62.4646L13.876 42.9553C12.4964 41.2299 12.7768 38.7128 14.5022 37.3332C16.2276 35.9536 18.7447 36.234 20.1243 37.9594L32.7973 53.8095L58.31 25.8062C59.7977 24.1731 62.3277 24.0554 63.9607 25.5432Z"
                    fill="#5AAC4D"
                  />
                  <circle
                    cx={40}
                    cy="40.5"
                    r={37}
                    stroke="#5AAC4D"
                    strokeWidth={6}
                  />
                </svg>
              </div>
              <div className="info-block text-center">
                <div className="info-font">感謝您的購買，已收到訂單！</div>
                <div className="info-font">訂單已在處理中</div>
                <div className="info-font">
                  {orderNumber ? '訂單編號: ' + orderNumber : '沒有訂單'}
                </div>
                <div className="info-font">
                  <span className="text-danger">
                    請拍照、或儲存網址以便日後查詢。
                  </span>
                </div>
              </div>
              {/* !這邊的按鈕應該要是繼續購物＆查看訂單 */}
              <div className="check-block row row-cols-lg-2 row-cols-1">
                <Link
                  className="check-btn btn btn-secondary mr10"
                  href="/product"
                >
                  繼續購物
                </Link>
                <Link
                  className="check-btn btn btn-checkOrder"
                  href="/member/order"
                >
                  查看訂單
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}