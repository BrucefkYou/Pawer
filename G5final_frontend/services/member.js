import axiosInstance from './axios-instance';

/**
 * 修改會員一般資料用(排除password, username, email)
 */
export const updateProfile = async (id = 0, user = {}) => {
  return await axiosInstance.put(`/member/${id}/profile`, user);
};

export const register = async (user = {}) => {
  return await axiosInstance.post('/member', user);
};
