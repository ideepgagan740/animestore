import { axiosClient } from '@infrastructure/http/axiosClient';

export const apiClient = {
  get: async <T>(url: string, params?: Record<string, unknown>) => {
    const response = await axiosClient.get<T>(url, { params });
    return response.data;
  },
  post: async <TResponse, TBody = unknown>(url: string, body?: TBody) => {
    const response = await axiosClient.post<TResponse>(url, body);
    return response.data;
  },
  put: async <TResponse, TBody = unknown>(url: string, body?: TBody) => {
    const response = await axiosClient.put<TResponse>(url, body);
    return response.data;
  },
  delete: async <T>(url: string) => {
    const response = await axiosClient.delete<T>(url);
    return response.data;
  },
};
