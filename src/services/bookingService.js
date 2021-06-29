import publicAxios from './axios/publicAxios';

export const bookEvent = async (params) => {
  try {
    const { data } = await publicAxios.post('/book', params);
    return { data };
  } catch (error) {
    return { error };
  }
};
