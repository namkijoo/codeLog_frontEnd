import { apiClient } from '@/shared/api';
import type { LoginRequest, LoginResponse } from '../model/types';

export function login(request: LoginRequest) {
  return apiClient<LoginResponse>('/api/auth/login', {
    method: 'POST',
    data: request,
  });
}
