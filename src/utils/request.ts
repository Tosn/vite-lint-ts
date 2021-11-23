import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { ResponseType } from './types';

// interface AxiosResponseSelf<ResponseType> extends AxiosResponse<ResponseType>

const axiosInstance:AxiosInstance = axios.create({
  baseURL: <string>import.meta.env.VITE_BASE_API,
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => config, (error: any) => Promise.reject(error));

axiosInstance.interceptors.response.use((response: AxiosResponse<ResponseType>) => response.data, (error: any) => Promise.reject(error));

const $post = <T>(url: string, params?: T): any => new Promise((resolve, reject) => {
  axiosInstance.post(url, params).then((res) => {
    resolve(res);
  }).catch((error) => {
    reject(error);
  });
});

const $get = <T>(url: string, params?: T): any => new Promise((resolve, reject) => {
  axiosInstance.get(url, { params }).then((res) => {
    resolve(res);
  }).catch((err) => {
    reject(err);
  });
});

export {
  $post,
  $get,
};
