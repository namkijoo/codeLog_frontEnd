import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { getApiUrl } from '@/shared/config/api';

type ApiErrorBody = {
  message?: string;
  error?: string;
};

const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

function getErrorMessage(error: AxiosError<ApiErrorBody>): string {
  const data = error.response?.data;
  if (data?.message) return data.message;
  if (data?.error) return data.error;
  const status = error.response?.status;
  return status ? `요청에 실패했습니다. (${status})` : '요청에 실패했습니다.';
}

export async function apiClient<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await http.request<T>({
      url: getApiUrl(path),
      ...config,
    });

    if (response.status === 204) {
      return undefined as T;
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(getErrorMessage(error));
    }
    throw error;
  }
}
