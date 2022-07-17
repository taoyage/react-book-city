import useSWR from 'swr';
import fetch from '@/utils/request';

import { IHomeData } from '@/pages/home/types';

const getHomeData = (url: string) => fetch.get(url);

export const useHomeData = () => {
  const url = '/api/v1/home';
  return useSWR<IHomeData>(url, getHomeData);
};
