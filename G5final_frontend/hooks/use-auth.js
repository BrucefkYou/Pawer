import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// toast訊息套件
import toast, { Toaster } from 'react-hot-toast';
// 訊息對話盒，需要先安裝套件
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AuthContext = createContext(null);
AuthContext.displayName = 'AuthContext';

// 建立導出AuthProvider元件
export function AuthProvider({ children }) {
  const router = useRouter();
  const initUserData = {
    id: 0,
    name: '',
    email: '',
    nickname: '',
    avatar: '',
  };

  //定義登入狀態與會員資料(可從此取得會員資料id, name, email, nickname, avatar，若需要更多就撈出id自行去撈db)
  const [auth, setAuth] = useState({
    isAuth: false,
    userData: initUserData,
  });

  // 解析accessToken用的函式
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  };

  // 使用MySwal取代Swal
  const MySwal = withReactContent(Swal);
  // 對話盒函式
  const notify = (
    icon = 'success', //圖示
    title, //標題
    msg, // 訊息
    btnTxt = 'OK', // 確認按鈕文字
    callback = () => {} // 按下確認後要作的事(函式)
  ) => {
    MySwal.fire({
      // position: 'top-end',  // 呈現位置
      icon: icon,
      title: title,
      text: msg,
      showConfirmButton: true,
      confirmButtonText: btnTxt,
      showCancelButton: true,
      cancelButtonText: '取消',
      // timer: 1500,   // 自動消失秒數
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  };

  // 得到會員個人的資料(登入之後才可以用)
  const getMember = async () => {
    try {
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
      // console.log(resData);

      if (resData.status === 'success') {
        return resData.data.member;
      } else {
        console.warn(resData);
        return {};
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
      return {}; // 返回空物件，表示錯誤時不會崩潰
    }
  };

  // 會員登入
  const login = async (email, password) => {
    try {
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
      // console.log(resData);

      if (resData.status === 'success') {
        // 可以得到id和Name
        const jwtData = parseJwt(resData.data.accessToken);
        // console.log(jwtData);
        // 設定到狀態中
        setAuth({
          isAuth: true,
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
        toast.success('登出成功');
      } else {
        toast.error('登出失敗');
      }
      // 設定回原本的未登入的初始值
      setAuth({
        isAuth: false,
        userData: initUserData,
      });
      // 清除購物車localstorage
      localStorage.removeItem('cart');
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
      const res = await fetch('http://localhost:3005/api/member', {
        credentials: 'include', // 設定cookie或是存取隱私資料時要加這個參數
        method: 'GET',
      });

      const resData = await res.json();
      // console.log(resData);

      if (resData.status === 'success') {
        const member = resData.data.member;
        const nextAuth = {
          isAuth: true,
          userData: member,
        };
        setAuth(nextAuth);
      } else {
        // 作隱私路由跳轉
        if (protectedRoutes.includes(router.pathname)) {
          toast.error('無進入權限，請先登入!');
          router.push(loginRoute);
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
