import React, { useState, useEffect } from 'react';
import styles from './login.module.scss';
import Image from 'next/image';

export default function ForgetPasswordForm({ Formtype, setFormtype }) {
  return (
    <>
      <div
        className={
          Formtype === 3
            ? `row ${styles['auth-container']} position-relative`
            : `d-none`
        }
      >
        <div className={`col-lg-6 p-0 d-none d-lg-block`}>
          <Image
            src={'/member/login-pic.png'}
            alt=""
            width={446}
            height={630}
            className={`${styles['pic']}`}
          />
        </div>
        <div
          className={`col-lg-6 p-5 ${styles['login-form']} d-flex flex-column justify-content-between`}
        >
          <h2 className="text-center mb-4">重設密碼</h2>
          <div>
            <p className="mb-4 ">
              請輸入您的會員電子郵件後，按下[取得驗證碼]按鈕，隨後將寄出驗證碼給您，請將驗證碼輸入至下方欄位，並重新設置新密碼。
            </p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="信箱" />
              <button
                className={`btn btn-primary`}
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
              className={`btn btn-primary w-100 mb-4 mt-3 ${styles['btn-custom']}`}
            >
              確定
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-link text-primary"
              type="button"
              onClick={() => {
                setFormtype(1);
              }}
            >
              註冊帳號
            </button>
            <button
              className="btn btn-link text-primary"
              type="button"
              onClick={() => {
                setFormtype(2);
              }}
            >
              回到登入
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
