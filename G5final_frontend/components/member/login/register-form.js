import React, { useState, useEffect } from 'react';
import styles from './login.module.scss';
import Image from 'next/image';
import toast from 'react-hot-toast';
import router from 'next/router';
import { useAuth } from '@/hooks/use-auth';
//顯示隱藏密碼圖示
import { FaEye } from 'react-icons/fa';
import { PiEyeClosed } from 'react-icons/pi';
// countdown use
import useInterval from '@/hooks/use-interval';
import { requestRegisterOtpToken, register } from '@/services/member';

export default function RegisterForm({ Formtype, setFormtype }) {
  // checkbox 呈現密碼用
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const { login } = useAuth();
  const [user, setUser] = useState({
    name: '',
    email: '',
    token: '',
    password: '',
    confirmPassword: '',
  });
  const [disableBtn, setDisableBtn] = useState(false);

  // 處理input輸入的共用函式，設定回userProfile狀態
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
    // 表單驗證 - START
    if (user.email === '') {
      return toast.error('請輸入電子信箱');
    }
    // 表單驗證 - END
    if (delay !== null) {
      toast.error('錯誤 - 60s內無法重新獲得驗証碼');
      return;
    }
    const res = await requestRegisterOtpToken(user.email);
    console.log(res.data);
    if (res.data.status === 'success') {
      toast.success(`${res.data.message}`);
      setCount(60); // 倒數 60秒
      setDelay(1000); // 每 1000ms = 1s 減1
      setDisableBtn(true);
    } else {
      toast.error(`${res.data.message}`);
    }
  };

  const handleRegister = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault();

    // 表單驗證 - START
    if (user.name === '') {
      return toast.error('請輸入姓名');
    }
    if (user.email === '') {
      return toast.error('請輸入電子信箱');
    }
    if (user.token === '') {
      return toast.error('請輸入驗證碼');
    }
    if (user.password === '') {
      return toast.error('請輸入密碼');
    }
    if (user.confirmPassword === '') {
      return toast.error('請輸入確認密碼');
    }
    if (user.password !== user.confirmPassword) {
      return toast.error('密碼與確認密碼不相同');
    }
    // 表單驗證 - END

    const res = await register(
      user.name,
      user.email,
      user.token,
      user.password
    );
    console.log(res.data);

    if (res.data.status === 'success') {
      toast.success(`${res.data.message}，正在為您登入會員`);
      // 註冊成功後，執行登入
      setTimeout(() => {
        login(user.email, user.password);
      }, 3000);
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
          <div>
            <p className="mb-4">
              請輸入您的電子信箱後，按下【取得驗證碼】按鈕，隨後將寄出驗證碼至您的信箱，請將驗證碼輸入至下方欄位並填寫姓名與密碼，完成註冊。
            </p>
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
                placeholder="電子信箱"
                name="email"
                value={user.email}
                onChange={handleFieldChange}
              />
              <button
                className={`btn btn-outline-warning ${styles['btn-verify']}`}
                type="button"
                onClick={handleRequestOtpToken}
                disabled={disableBtn}
              >
                {delay ? count + '秒後可取得驗證碼' : '取得驗證碼'}
              </button>
            </div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="驗證碼"
              name="token"
              value={user.token}
              onChange={handleFieldChange}
            />
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control mb-3"
                placeholder="密碼"
                name="password"
                value={user.password}
                onChange={handleFieldChange}
              />
              <button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className={`${styles['eye-btn']}`}
              >
                {showPassword ? <FaEye /> : <PiEyeClosed />}
              </button>
            </div>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control mb-3"
                placeholder="確認密碼"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleFieldChange}
              />
              <button
                onClick={() => {
                  setConfirmShowPassword(!showConfirmPassword);
                }}
                className={`${styles['eye-btn']}`}
              >
                {showConfirmPassword ? <FaEye /> : <PiEyeClosed />}
              </button>
            </div>
            <button
              className={`btn btn-warning text-white w-100 mb-4 mt-3 ${styles['btn-custom']}`}
              onClick={handleRegister}
            >
              註冊
            </button>
          </div>
          <button
            type="button"
            className="btn btn-link text-warning p-0"
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
            priority
          />
        </div>
      </div>
    </>
  );
}
