import { VITE_API_ENDPOINT } from '@configs/api-config';
import axios from 'axios';
import type { AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
const api = axios.create({
  baseURL: VITE_API_ENDPOINT,
});

const get = async <T>({
  url,
  params,
  token,
}: {
  url: string;
  params?: { [key: string]: any };
  token?: string;
}) => {
  (api.interceptors.request as AxiosInterceptorManager<AxiosRequestConfig>).use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      const newConfig: AxiosRequestConfig = {
        ...config,
      };

      if (token) {
        return {
          ...newConfig,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }

      return newConfig;
    }
  );

  return await api.get<T>(url, {
    params,
  });
};

export default { get };
