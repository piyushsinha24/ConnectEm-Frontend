import publicAxios from './axios/publicAxios';

export const loginUser = async (params) => {
  try {
    const { data } = await publicAxios.post(`/user/login`, params);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const registerUser = async (params) => {
  try {
    const { data } = await publicAxios.post(`/user/register`, params);
    return { data };
  } catch (error) {
    return { error };
  }
};
