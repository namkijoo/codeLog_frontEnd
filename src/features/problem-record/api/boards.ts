import { apiClient } from '@/shared/api';
import type { BoardRequest, BoardResponse } from '../model/types';

export function createBoard(request: BoardRequest) {
  return apiClient<BoardResponse>('/api/boards', {
    method: 'POST',
    data: request,
  });
}
