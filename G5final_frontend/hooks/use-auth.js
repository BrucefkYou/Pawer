import { useRouter } from 'next/router';
import React, { useState, useEffect, createContext, useContext } from 'react';

// 1. 建立(與導出)Context-creatContext
// creatContext(null)-->括號內部為自訂預設值，通常會放入null用於除錯
const AuthContext = createContext(null);
// 可以設定displayName，這是搭配react devtools開發時使用
AuthContext.displayName = 'AuthContext';

// 2. 建立Provider(供應者)元件
// 共用狀態在其中進行集中管理
// 提供在MyApp(_app.js)階層最上層元件中套用
// 他是使用有開頭/結尾的特殊元件
// props.children指的是包裹在其中的所有子女元件
// 此處可以用export就好不需要用到export default
export function AuthProvider({ children }) {
  const router = useRouter();
  //   會員
  const [auth, setAuth] = useState({
    // 代表會員是否有登入的布林值
    isAuth: false,
    // 會員的資料物件
    userData: {
      id: 0,
      name: '',
      email: '',
      username: '',
    },
  });

  const login = (username, password) => {
    if (username === 'herry' && password === '12345') {
      setAuth({
        isAuth: true,
        userData: {
          id: 1,
          name: 'herry',
          email: 'herry@test.com',
          username: username,
        },
      });
      if (confirm('歡迎你，是否要前往個人資料頁？')) {
        router.push('/20241011/user/profile');
      }
    } else {
      alert('帳號密碼錯誤，無法登入！');
    }
  };
  const logout = () => {
    setAuth({
      isAuth: false,
      userData: {
        id: 0,
        name: '',
        email: '',
        username: '',
      },
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3.建立一個包裝useContext的專用名稱勾子Hook
// 提高閱讀性(專屬名稱)
// 簡化使用context的程式語法
export const useAuth = () => useContext(AuthContext);
