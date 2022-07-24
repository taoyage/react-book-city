import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface Return<Data, Error>
  // 取SWRResponse中的'isValidating' | 'error' | 'mutate' 三个属性，并添加data和response属性
  extends Pick<SWRResponse<AxiosResponse<Data>, AxiosError<Error>>, 'isValidating' | 'error' | 'mutate'> {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  // 删除SWRConfiguration对象中的fallbackData类型定义, 默认fallbackData 等于传入的 AxiosResponse<Data>类型
  extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'fallbackData'> {
  // 重新定义fallbackData类型
  fallbackData?: Data;
}

const axiosConfig: AxiosRequestConfig = {
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  baseURL: 'http://192.168.0.102:8001',
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
  (error) => {
    return Promise.reject(error);
  }
);

function useRequest<Data = unknown, Error = unknown>(
  request: AxiosRequestConfig,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(request, () => AxiosInstance.request(request), { ...config });

  return {
    data: response?.data,
    response,
    error,
    isValidating,
    mutate,
  };
}

export default useRequest;
