import React, { useState, useEffect } from 'react';
import styles from './login.module.scss';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';

export default function LoginForm({ Formtype, setFormtype }) {
  const [user, setUser] = useState({ email: '', password: '' });
  // 共同處理input的onChange事件
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { login } = useAuth();
  // console.log(user);

  return (
    <>
      <div
        className={
          Formtype === 2
            ? `row ${styles['auth-container']} position-relative`
            : `d-none`
        }
      >
        <div className={`col-lg-6 p-0 d-none d-lg-block`}>
          <Image
            src={'/member/login-pic.png'}
            alt=""
            width={446}
            height={520}
            className={`${styles['pic']}`}
          />
        </div>
        <div
          className={`col-lg-6 p-5 ${styles['login-form']} d-flex flex-column justify-content-between`}
        >
          <h2 className="text-center mb-5">會員登入</h2>
          <div>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="信箱"
              name="email"
              value={user.email}
              onChange={handleFieldChange}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="密碼"
              name="password"
              value={user.password}
              onChange={handleFieldChange}
            />
            <button
              className={`btn btn-primary w-100 mt-3  ${styles['btn-custom']}`}
              onClick={() => {
                login(user.email, user.password);
              }}
            >
              登入
            </button>
            <button
              className={`btn btn-outline-primary w-100 mb-2 mt-3 ${styles['btn-custom']} position-relative`}
            >
              <Image
                src="/member/google-icon.png"
                alt=""
                width={30}
                height={30}
                className={`${styles['btn-google']}`}
              />
              連結Google帳號
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
                setFormtype(3);
              }}
            >
              忘記密碼
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
