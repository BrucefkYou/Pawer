import React, { useState, useEffect } from 'react';
import styles from './login.module.scss';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/use-auth';
import axiosInstance from '@/services/axios-instance';
import { useRouter } from 'next/router';
//顯示隱藏密碼圖示
import { FaEye } from 'react-icons/fa';
import { PiEyeClosed } from 'react-icons/pi';
//google login
import useFirebase from '@/hooks/use-firebase';
import { googleLogin } from '@/services/member';
import { se } from 'date-fns/locale';

export default function LoginForm({ Formtype, setFormtype }) {
  const router = useRouter();
  const [user, setUser] = useState({ email: '', password: '' });
  // 共同處理input的onChange事件
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { login, logout, auth, setAuth, nextRoute, setNextRoute } = useAuth();

  const runRoute = () => {
    // 導向下一個路由
    router.push(nextRoute);
    // 設定下一個路由回預設的會員資料頁
    setNextRoute('/member');
  }

  const handleLogin = async () => {
    // 表單驗證 - START
    if (user.email === '') {
      return toast.error('請輸入電子信箱');
    }
    if (user.password === '') {
      return toast.error('請輸入密碼');
    }
    // 表單驗證 - END

    // 傳統登入
    try {
      const res = await axiosInstance.post('/member/login', user);
      // console.log(res);
      // 回傳資料
      // res.json({
      //   status: 'success',
      //   token: { accessToken },
      //   memberdata: dbMember,
      // })

      if (res.data.status === 'success') {
        // 將登入成功與取回的會員資料設定到全域狀態auth，其他頁面可以直接取用
        // 使用 ?? 可以 接受false與0的值  null undefined都會被排除
        setAuth({
          isAuth: true,
          memberData: {
            ...auth.memberData,
            id: res.data.memberData.ID ?? '',
            name: res.data.memberData.Name ?? '',
            email: res.data.memberData.eMail ?? '',
            nickname: res.data.memberData.Nickname ?? '',
            avatar: res.data.memberData.Avatar ?? '',
            google_uid: res.data.memberData.google_uid ?? '',
            google_avatar: res.data.memberData.google_avatar ?? '',
            isPetCom: res.data.memberData.isPetCom ?? '',
          },
        });
        // 顯示登入成功訊息
        toast.success(res.data.message);
        // 執行路由導向
        runRoute();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
      return {}; // 返回空物件，表示錯誤時不會崩潰
    }



  };
  const { loginGoogle } = useFirebase();

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginPopup = async (providerData) => {
    console.log(providerData);

    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (auth.isAuth) return;

    // 向伺服器進行登入動作
    const res = await googleLogin(providerData);
    console.log('callback', res);

    if (res.data.status === 'success') {
      try {
        const res = await axiosInstance.get(`/member`);
        console.log('google登入後', res.data);

        if (res.data.status === 'success') {
          const nextAuth = {
            isAuth: true,
            memberData: {
              ...auth.memberData,
              id: res.data.memberData.ID ?? '',
              name: res.data.memberData.Name ?? '',
              email: res.data.memberData.eMail ?? '',
              nickname: res.data.memberData.Nickname ?? '',
              avatar: res.data.memberData.Avatar ?? '',
              google_uid: res.data.memberData.google_uid ?? '',
              google_avatar: res.data.memberData.google_avatar ?? '',
              isPetCom: res.data.memberData.isPetCom ?? '',
            },
          };
          setAuth(nextAuth);
         // 執行路由導向
         runRoute();
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      toast.error(res.data.data.message);
    }
    // 顯示登入成功訊息
    toast.success(res.data.data.message);
  };

  // checkbox 呈現密碼用
  const [showPassword, setShowPassword] = useState(false);

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

            <button
              className={`btn btn-primary w-100 mt-3  ${styles['btn-custom']}`}
              onClick={handleLogin}
            >
              登入
            </button>
            <button
              className={`btn btn-outline-primary w-100 mb-4 mt-3 ${styles['btn-custom']} position-relative`}
              onClick={() => loginGoogle(callbackGoogleLoginPopup)}
            >
              <Image
                src="/member/google-icon.png"
                alt=""
                width={30}
                height={30}
                className={`${styles['btn-google']}`}
              />
              <span className={`${styles['span-google']}`}>Google帳號登入</span>

            </button>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-link text-primary p-0"
              type="button"
              onClick={() => {
                setFormtype(1);
              }}
            >
              註冊帳號
            </button>
            <button
              className="btn btn-link text-primary p-0"
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
