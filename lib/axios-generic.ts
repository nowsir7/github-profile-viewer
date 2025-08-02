import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axios";

export async function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.get(url, config);
  return response.data;
}

export async function post<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.post(
    url,
    data,
    config
  );
  return response.data;
}

export async function put<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
  return response.data;
}

export async function patch<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.patch(
    url,
    data,
    config
  );
  return response.data;
}

export async function del<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
  return response.data;
}
