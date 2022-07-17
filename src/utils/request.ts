import axios, { AxiosRequestConfig, AxiosResponse, Canceler, ResponseType } from 'axios';

const pendingAjax = new Map();
const CancelToken = axios.CancelToken;

const removePendingAjax = (config: AxiosRequestConfig, c?: Canceler) => {
  const data: String = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
  const url = config.method! + config.url! + JSON.stringify(config.params) + data;

  if (pendingAjax.has(url)) {
    c ? c() : pendingAjax.delete(url);
  } else {
    pendingAjax.set(url, { cancel: c });
  }
};

const axiosConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  baseURL: 'http://192.168.0.102:8001',
  responseType: 'json',
};

const AxiosInstance = axios.create(axiosConfig);

AxiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.cancelToken = new CancelToken((c: Canceler) => {
      removePendingAjax(config, c);
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    removePendingAjax(res.config);
    if (res.status !== 200) {
      Promise.reject(res);
    }
    return res.data.data;
  },
  (error) => {
    removePendingAjax(error.response.config);
    return Promise.reject(error);
  }
);

interface Fetch {
  get: (url: string, qs?: string, responseType?: ResponseType) => Promise<any>;
  post: (url: string, qs: string, data: any) => Promise<any>;
}

const fetch: Fetch = {
  get: (url, qs, responseType = 'json') => {
    return AxiosInstance.get(url, { params: qs, responseType });
  },
  post: (url, qs, data) => {
    return AxiosInstance.post(url, data, { params: qs });
  },
};

export default fetch;
