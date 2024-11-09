import axiosInstance from './axios-instance';

/**
 * 修改會員一般資料用(排除password, username, email)
 */
export const updateProfile = async (memberId = 0, user = {}) => {
  return await axiosInstance.put(`/member/profile/${memberId}`, user);
};

export const register = async (user = {}) => {
  return await axiosInstance.post('/member', user);
};

export const getOrdersByUser = async (memberId = 0) => {
  return await axiosInstance.get(`/member/${memberId}/orders`);
};

export const getOrder = async (memberId = 0, orderId = 0) => {
  return await axiosInstance.get(`/member/${memberId}/order/${orderId}`);
};

export const getCouponsByUser = async (memberId = 0) => {
  return await axiosInstance.get(`/member/${memberId}/coupons`);
};
