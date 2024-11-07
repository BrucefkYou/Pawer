import React, { useState, useEffect } from 'react';
import { register } from '@/services/member';
import styles from './login.module.scss';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import router from 'next/router';
import { useAuth } from '@/hooks/use-auth';

export default function RegisterForm({ Formtype, setFormtype }) {
  const { login } = useAuth();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  // 處理input輸入的共用函式，設定回userProfile狀態
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault();

    const res = await register(user);

    if (res.data.status === 'success') {
      toast.success(res.data.message);
      // 註冊成功後，執行登入
      login(user.email, user.password);
    } else {
      toast.error(`${res.data.message}`);
    }
  };
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
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="姓名"
                name="name"
                value={user.name}
                onChange={handleFieldChange}
              />
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="信箱"
                  name="email"
                  value={user.email}
                  onChange={handleFieldChange}
                />
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
                type="password"
                className="form-control mb-3"
                placeholder="密碼"
                name="password"
                value={user.password}
                onChange={handleFieldChange}
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
          </form>
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

      {/* 土司訊息視窗用 */}
      <Toaster />
    </>
  );
}
