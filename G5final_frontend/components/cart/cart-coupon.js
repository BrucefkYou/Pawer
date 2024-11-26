import React, { useState, useEffect } from 'react';
import styles from '@/components/member/coupon/coupon.module.scss';
import Image from 'next/image';

export default function CartCoupon({ coupon }) {
  const now = new Date();
  const endTime = new Date(coupon.EndTime);
  const unused = coupon.Used_Date === null;
  const used = coupon.Used_Date !== null;
  const expired = endTime < now;
  // 計算出現即將到期的毫秒數
  const notifyMillis = 60 * 24 * 60 * 7 * 1000;
  // 計算現在到到期時間的毫秒差
  const timeDifferenceMillis = endTime - now;
  // 計算剩餘天數（毫秒轉為天數）
  const remainingDays = Math.ceil(timeDifferenceMillis / (1000 * 60 * 60 * 24)); // 無條件進位

  return (
    <>
      <div>
        <div
          className={`position-relative ${
            !coupon.checked ? styles['dark'] : ''
          }`}
        >
          <Image
            src={`/member/coupon-bg.png`}
            width={385}
            height={165}
            alt=""
          />
          <div className={`col-4 p-1 ${styles['coupon-content']}`}>
            <div>DISCOUNT COUPON</div>
            <div className={`${styles['value']}`}>
              {coupon.CalculateType === 2 ? (
                <>
                  <span className="me-1">NT$</span>
                  <span className="fs-2">{coupon.Value.toLocaleString()}</span>
                </>
              ) : (
                <>
                  <span className="fs-2 me-2">{coupon.Value}</span>
                  <span className="fs-5">折</span>
                </>
              )}
            </div>
            <div className={`${styles['name']}`}>{coupon.Name}</div>
            <div className={`${styles['use-time']}`}>
              {coupon.Received_Date.slice(0, 10)} ~{' '}
              {coupon.EndTime.slice(0, 10)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
