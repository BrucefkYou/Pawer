import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext(null);
AuthContext.displayName = 'AuthContext';

export function AuthProvider({ children }) {
  const router = useRouter();
  const [auth, setAuth] = useState({
    isAuth: false, // 代表會員是否已經登入的信號值
    userData: {
      id: 0,
      name: '',
      email: '',
      username: '',
    },
  });

  // 解析accessToken用的函式
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  };

  // 模擬會員登入
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
      // 可以得到id和email
      const jwtData = parseJwt(resData.data.accessToken);
      console.log(jwtData);

      // 設定到狀態中
      setAuth({
        isAuth: true,
      });
    } else {
      alert('帳號或密碼錯誤');
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
