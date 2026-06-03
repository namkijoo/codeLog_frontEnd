import { apiClient } from '@/shared/api';
import type { SignupRequest } from '../model/types';

export function signup(request: SignupRequest) {
  return apiClient<void>('/api/auth/signup', {
    method: 'POST',
    data: request,
  });
}
