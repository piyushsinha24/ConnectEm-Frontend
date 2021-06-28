import protectedAxios from './axios/protectedAxios';

export const userEvents = async () => {
  try {
    const { data } = await protectedAxios.get(`/event`);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const toggleEvent = async (params) => {
  try {
    const { data } = await protectedAxios.post(`/event/toggle/${params}`);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const createEvent = async (params) => {
  try {
    const { data } = await protectedAxios.post(`/event`, params);
    return { data };
  } catch (error) {
    return { error };
  }
};
