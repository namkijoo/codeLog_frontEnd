import { apiClient } from '@/shared/api';
import type { NoteRequest, NoteResponse } from '../model/types';

export function getNote(id: number) {
  return apiClient<NoteResponse>(`/api/notes/${id}`, {
    method: 'GET',
  });
}

export function updateNote(id: number, request: NoteRequest) {
  return apiClient<NoteResponse>(`/api/notes/${id}`, {
    method: 'PUT',
    data: request,
  });
}

export function deleteNote(id: number) {
  return apiClient<void>(`/api/notes/${id}`, {
    method: 'DELETE',
  });
}
