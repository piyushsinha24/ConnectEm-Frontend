import axios from 'axios';
import { Auth } from '../../module/Auth';
import { config } from '../../utility/config';

const protectedAxios = axios.create({
  baseURL: config.apiBackendURL,
});

protectedAxios.interceptors.request.use(
  (config) => {
    const token = Auth().getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

protectedAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const code = error && error.response ? error.response.status : 0;
    if (code === 401 || code === 403) {
      alert('Not authorised to access');
    }
    return Promise.reject(error);
  }
);

export default protectedAxios;
