import React, { useState, useEffect } from 'react';
import styles from '@/components/member/coupon/coupon.module.scss';
import Image from 'next/image';

export default function Coupon({ coupon }) {
  const now = new Date();
  const endTime = new Date(coupon.EndTime);

  // 計算出現即將到期的毫秒數
  const notifyMillis = 60 * 24 * 60 * 60 * 1000;

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
        <div className={`${styles['coupon-message']}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="me-2">使用期限</span>
              <span>{coupon.EndTime.slice(0, 10)}</span>
            </div>
            {endTime - now < notifyMillis && endTime > now && (
              <span className={`${styles['badge']} badge text-bg-danger`}>
                即將到期
              </span>
            )}
          </div>
          {coupon.PromotionCondition === 2 ? (
            <div>
              <span className="text-danger me-2">
                訂單滿 NT${coupon.ConditionMinValue.toLocaleString()}
              </span>
              <span className="me-2">折抵</span>
              <span className="text-danger">
                {coupon.CalculateType === 2 ? (
                  <>NT${coupon.Value.toLocaleString()}</>
                ) : (
                  <>
                    <span>{coupon.Value}</span>折
                  </>
                )}
              </span>
            </div>
          ) : (
            <>
              <span className="text-danger me-2">不限制門檻</span>
              <span className="me-2">折抵</span>
              {coupon.CalculateType === 2 ? (
                <span className="text-danger">
                  NT${coupon.Value.toLocaleString()}
                </span>
              ) : (
                <span className="text-danger">{coupon.Value}折</span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
