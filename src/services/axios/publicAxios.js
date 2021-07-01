import axios from 'axios';
import { config } from '../../utility/config';

const publicAxios = axios.create({
  baseURL: config.apiBackendURL,
});

export default publicAxios;
