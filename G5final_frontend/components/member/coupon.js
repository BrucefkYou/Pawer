import React, { useState, useEffect } from 'react';
import styles from '@/components/member/coupon.module.scss';
import Image from 'next/image';

export default function Coupon(props) {
  return (
    <>
      <div className="position-relative">
        <Image
          src={`/member/coupon-bg.png`}
          width={385}
          height={165}
          className="coupon"
          alt="1"
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
    </>
  );
}
