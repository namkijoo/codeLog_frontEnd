import { apiClient } from '@/shared/api';
import type { BoardRequest, BoardResponse } from '../model/types';

export function getMyBoards() {
  return apiClient<BoardResponse[]>('/api/boards', {
    method: 'GET',
  });
}

export function updateBoard(id: number, request: BoardRequest) {
  return apiClient<BoardResponse>(`/api/boards/${id}`, {
    method: 'PUT',
    data: request,
  });
}

export function deleteBoard(id: number) {
  return apiClient<void>(`/api/boards/${id}`, {
    method: 'DELETE',
  });
}
