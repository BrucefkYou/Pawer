import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/services/axios-instance';
import { useRouter } from 'next/router';
// toast訊息套件
import toast, { Toaster } from 'react-hot-toast';

const AuthContext = createContext(null);
AuthContext.displayName = 'AuthContext';

// 建立導出AuthProvider元件
export function AuthProvider({ children }) {
  const router = useRouter();

  //定義登入狀態與會員資料(可從此取得會員資料id, name, email, nickname, avatar，若需要更多就撈出id自行去撈db)
  const initMemberData = {
    id: 0,
    name: '',
    email: '',
    nickname: '',
    avatar: '',
  };
  const [auth, setAuth] = useState({
    isAuth: false,
    memberData: initMemberData,
  });

  // 解析accessToken用的函式
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  };

  // 會員登入
  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post('/member/login', {
        email,
        password,
      });
      console.log(res);
      // 回傳資料
      // res.json({
      //   status: 'success',
      //   token: { accessToken },
      //   memberdata: dbMember,
      // })

      if (res.data.status === 'success') {
        // 可以解析jwt token得出id,name (!後續要加上google_uid)
        const jwtData = parseJwt(res.data.token.accessToken);
        // console.log(jwtData);

        // 將登入成功與取回的會員資料設定到全域狀態auth，其他頁面可以直接取用
        // 使用 ?? 可以 接受false與0的值  null undefined都會被排除
        setAuth({
          isAuth: true,
          memberData: {
            id: res.data.memberData.ID ?? '',
            name: res.data.memberData.Name ?? '',
            email: res.data.memberData.eMail ?? '',
            nickname: res.data.memberData.Nickname ?? '',
            avatar: res.data.memberData.Avatar ?? '',
          },
        });
        // 導向到會員中心
        router.push('/member');
        // 顯示登入成功訊息
        toast.success('登入成功');
      } else {
        toast.error('帳號或密碼錯誤');
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
      return {}; // 返回空物件，表示錯誤時不會崩潰
    }
  };

  // 會員登出
  const logout = async () => {
    try {
      const res = await axiosInstance.post('/member/logout');
      if (res.data.status === 'success') {
        toast.success('登出成功');
      } else {
        toast.error('登出失敗');
      }
      // 設定回原本的未登入的初始值
      setAuth({
        isAuth: false,
        memberData: initMemberData,
      });
      // 清除購物車localstorage
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error fetching member data:', error);
      return {}; // 返回空物件，表示錯誤時不會崩潰
    }
  };

  // 得到會員個人的資料(登入之後才可以用)
  const getMember = async () => {
    try {
      const res = await axiosInstance.get('/member');

      if (res.data.status === 'success') {
        // console.log('取得個人資料成功:', res);
        return res;
      } else {
        console.warn(res.data.message);
        return {};
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
      return {}; // 返回空物件，表示錯誤時不會崩潰
    }
  };

  // 隱私頁面路由，未登入時會，檢查後跳轉至登入頁面
  const loginRoute = '/member/login';
  const protectedRoutes = [
    '/member',
    '/member/order',
    '/member/coupon',
    '/member/favorite',
    '/member/join',
    '/member/join/favorite',
    '/member/join/release',
    '/member/blog',
    '/member/blog/favorite',
    '/member/communicator/comReserve',
    '/member/communicator/detail',
    '/member/communicator/edit',
    '/member/communicator/create',
  ];
  // 隱私頁面路由，未登入時會，檢查後跳轉至登入頁面(檢查會員登入狀態)
  const checkState = async () => {
    try {
      const res = await axiosInstance.get('/member');
      // console.log('check:', res);

      if (res.data.status === 'success') {
        const nextAuth = {
          isAuth: true,
          memberData: {
            id: res.data.memberData.ID ?? '',
            name: res.data.memberData.Name ?? '',
            email: res.data.memberData.eMail ?? '',
            nickname: res.data.memberData.Nickname ?? '',
            avatar: res.data.memberData.Avatar ?? '',
          },
        };
        setAuth(nextAuth);
      } else {
        // 作隱私路由跳轉
        if (protectedRoutes.includes(router.pathname)) {
          router.push(loginRoute);
          toast.error('無進入權限，請先登入!');
          // 減緩跳轉時間
          // setTimeout(() => {
          //   alert('無進入權限，請先登入!');
          //   router.push(loginRoute);
          // }, 1500);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  //隱私頁面路由，未登入時會，檢查後跳轉至登入頁面(每次進入頁面執行檢查)
  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      checkState();
    }
    // eslint-disable-next-line
  }, [router.isReady, router.pathname]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, getMember }}>
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
