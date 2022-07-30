import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  baseURL: 'http://localhost:8001',
  responseType: 'json',
};

const AxiosInstance = axios.create(axiosConfig);

AxiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status !== 200) {
      Promise.reject(res);
    }
    return res.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
