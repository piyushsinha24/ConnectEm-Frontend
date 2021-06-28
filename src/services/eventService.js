import protectedAxios from './axios/protectedAxios';

export const createEvent = async (params) => {
  try {
    const { data } = await protectedAxios.post(`/event`, params);
    return { data };
  } catch (error) {
    return { error };
  }
};
