import React, { useState, useEffect } from 'react';
import styles from './login.module.scss';
import Image from 'next/image';

export default function RegisterForm({ Formtype, setFormtype }) {
  return (
    <>
      <div
        className={
          Formtype === 1
            ? `row ${styles['auth-container']} position-relative`
            : `d-none`
        }
      >
        <div
          className={`col-lg-6 p-5 ${styles['signup-form']} d-flex flex-column justify-content-between`}
        >
          <h2 className="text-center mb-4">會員註冊</h2>
          <div>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="信箱" />
              <button
                className={`btn btn-outline-warning ${styles['btn-verify']}`}
                type="button"
                id="button-addon2"
              >
                取得驗證碼
              </button>
            </div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="驗證碼"
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="手機"
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="密碼"
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="確認密碼"
            />
            <button
              className={`btn btn-warning text-white w-100 mb-4 mt-3 ${styles['btn-custom']}`}
            >
              註冊
            </button>
          </div>
          <button
            type="button"
            className="btn btn-link text-warning"
            onClick={() => {
              setFormtype(2);
            }}
          >
            已有帳號
          </button>
        </div>
        <div className={`col-lg-6 p-0 d-none d-lg-block`}>
          <Image
            src={'/member/siginup-pic.png'}
            alt=""
            width={446}
            height={630}
            className={`${styles['pic']}`}
          />
        </div>
      </div>
    </>
  );
}
