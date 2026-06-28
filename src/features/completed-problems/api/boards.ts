import { apiClient } from '@/shared/api';
import type { BoardResponse } from '../model/types';

export function getMyBoards() {
  return apiClient<BoardResponse[]>('/api/boards', {
    method: 'GET',
  });
}
