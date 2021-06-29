import protectedAxios from './axios/protectedAxios';
import publicAxios from './axios/publicAxios';

export const userEvents = async () => {
  try {
    const { data } = await protectedAxios.get(`/event`);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const getEventDetails = async (params) => {
  try {
    const { data } = await publicAxios.get(`/event/${params.id}`, params);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const Event = async (params) => {
  try {
    const { data } = await publicAxios.get(`/event/${params}`);
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
