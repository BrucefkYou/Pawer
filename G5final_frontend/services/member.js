import axiosInstance from './axios-instance';

//  修改會員資料用 (含頭像，不含密碼)
export const updateProfile = async (memberId = 0, formData) => {
  return await axiosInstance.put(`/member/profile/${memberId}`, formData);
};

// 取得會員所有訂單 (不含訂單商品)
export const getOrdersByUser = async (memberId = 0) => {
  return await axiosInstance.get(`/member/${memberId}/orders`);
};

// 取得會員單一訂單 (含訂單商品)
export const getOrder = async (memberId = 0, orderId = 0) => {
  return await axiosInstance.get(`/member/${memberId}/order/${orderId}`);
};

// 取得會員所有優惠券
export const getCouponsByUser = async (memberId = 0) => {
  return await axiosInstance.get(`/member/${memberId}/coupons`);
};

// Google Login(Firebase)登入用，providerData為登入後得到的資料
export const googleLogin = async (providerData = {}) => {
  return await axiosInstance.post('/google-login', providerData);
};

// 解析accessToken用的函式
export const parseJwt = (token) => {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
};

// 忘記密碼/OTP 要求一次性密碼
export const requestFPOtpToken = async (email = '') => {
  return await axiosInstance.post('/otp/forget-password-mail', { email });
};

// 忘記密碼/OTP 重設密碼
export const resetPassword = async (email = '', password = '', token = '') => {
  return await axiosInstance.post('/otp/reset-password', {
    email,
    token,
    password,
  });
};

// 註冊會員/OTP 要求一次性密碼
export const requestRegisterOtpToken = async (email = '') => {
  return await axiosInstance.post('/otp/register-mail', { email });
};

// 註冊會員/OTP 新增會員
export const register = async (
  name = '',
  email = '',
  token = '',
  password = ''
) => {
  return await axiosInstance.post('/otp/register', {
    name,
    email,
    token,
    password,
  });
};
