import React, { useState, useEffect } from 'react';
import styles from './login.module.scss';
import Image from 'next/image';
// countdown use
import useInterval from '@/hooks/use-interval';
import { requestOtpToken, resetPassword } from '@/services/member';
import toast from 'react-hot-toast';

export default function ForgetPasswordForm({ Formtype, setFormtype }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);

  // 倒數計時 countdown use
  const [count, setCount] = useState(60); // 60s
  const [delay, setDelay] = useState(null); // delay=null可以停止, delay是數字時會開始倒數

  // 倒數計時 countdown use
  useInterval(() => {
    setCount(count - 1);
  }, delay);
  // 倒數計時 countdown use
  useEffect(() => {
    if (count <= 0) {
      setDelay(null);
      setDisableBtn(false);
    }
  }, [count]);

  // 處理要求一次性驗証碼用
  const handleRequestOtpToken = async () => {
    if (delay !== null) {
      toast.error('錯誤 - 60s內無法重新獲得驗証碼');
      return;
    }

    const res = await requestOtpToken(email);
    console.log(res.data);

    if (res.data.status === 'success') {
      toast.success(`${res.data.message}`);
      setCount(60); // 倒數 60秒
      setDelay(1000); // 每 1000ms = 1s 減1
      setDisableBtn(true);
    } else {
      toast.error(`錯誤 - ${res.data.message}`);
    }
  };

  // 處理重設密碼用
  const handleResetPassword = async () => {
    const res = await resetPassword(email, password, token);
    console.log(res.data);

    if (res.data.status === 'success') {
      toast.success(`${res.data.message}，為您轉至登入頁面`);
      setTimeout(() => {
        setFormtype(2);
      }, 2000);
    } else {
      toast.error(`${res.data.message}`);
    }
  };

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
              <input
                type="text"
                className="form-control"
                placeholder="電子郵件"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className={`btn btn-primary`}
                type="button"
                onClick={handleRequestOtpToken}
                disabled={disableBtn}
              >
                {delay ? count + '秒後可取得驗証碼' : '取得驗証碼'}
              </button>
            </div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="驗證碼"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="確認密碼"
            />
            <button
              className={`btn btn-primary w-100 mb-4 mt-3 ${styles['btn-custom']}`}
              onClick={handleResetPassword}
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
