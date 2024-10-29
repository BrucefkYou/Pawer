import React, { useState, useEffect } from 'react';
import styles from '@/components/member/coupon.module.scss';
import Image from 'next/image';

export default function Coupon(props) {
  return (
    <>
      <div>
        <div className="position-relative">
          <Image
            src={`/member/coupon-bg.png`}
            width={385}
            height={165}
            className="coupon"
            alt=""
          />
          <div className={styles['coupon-content']}>
            <div>DISCOUNT COUPON</div>
            <div className={styles['value']}>
              NT$ <span className="fs-2">100</span>
            </div>
            <div className={styles['name']}>會員註冊禮</div>
            <div className={styles['use-time']}>2024/12/1~2024/12/31</div>
          </div>
        </div>
        <div className={`${styles['coupon-message']}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="me-2">使用期限</span>
              <span>2024/12/31</span>
            </div>
            <span className={`${styles['badge']} badge text-bg-danger`}>
              即將到期
            </span>
          </div>
          <div>
            <span className="me-2">訂單滿</span>
            <span className="text-danger me-2">NT$1,000</span>
            <span className="me-2">折抵</span>
            <span className="text-danger">NT$100</span>
          </div>
        </div>
      </div>
    </>
  );
}
