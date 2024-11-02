import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext(null);
AuthContext.displayName = 'AuthContext';

// 建立導出AuthProvider元件
export function AuthProvider({ children }) {
  const router = useRouter();
  const [auth, setAuth] = useState({
    isAuth: false,
    userData: {
      id: 0,
      name: '',
      email: '',
      nickname: '',
      avatar: '',
    },
  });

  // 解析accessToken用的函式
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  };

  // 得到會員個人的資料(登入之後才可以用)
  const getMember = async () => {
    // 向伺服器作fetch
    const res = await fetch(`http://localhost:3005/api/member`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
    const resData = await res.json();
    console.log(resData);

    if (resData.status === 'success') {
      return resData.data.member;
    } else {
      console.warn(resData);
      return {};
    }
  };

  // 會員登入
  const login = async (email, password) => {
    // 向伺服器作fetch
    const res = await fetch('http://localhost:3005/api/member/login', {
      credentials: 'include', // 設定cookie必要設定，如果有需要授權或認証一定要加
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const resData = await res.json();
    console.log(resData);

    if (resData.status === 'success') {
      // 可以得到id和Name
      const jwtData = parseJwt(resData.data.accessToken);
      console.log(jwtData);
      // 設定到狀態中
      setAuth({
        isAuth: true,
      });
      // 導向到會員中心
      router.push('/member');
    } else {
      alert('帳號或密碼錯誤');
    }
  };

  // 會員登出
  const logout = async () => {
    // 向伺服器作fetch
    const res = await fetch('http://localhost:3005/api/member/logout', {
      credentials: 'include', // 設定cookie必要設定，如果有需要授權或認証一定要加
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: '',
    });

    const resData = await res.json();

    if (resData.status === 'success') {
      alert('成功登出!');

      // 設定回原本的未登入的初始值
      setAuth({
        isAuth: false,
        userData: {
          id: 0,
          name: '',
          email: '',
          nickname: '',
          avatar: '',
        },
      });
    } else {
      alert('登出失敗!');
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, getMember }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
