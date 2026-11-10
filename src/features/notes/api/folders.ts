import { apiClient } from '@/shared/api';
import type {
  CreateFolderRequest,
  FolderResponse,
  NoteListItem,
  NoteRequest,
  NoteResponse,
  UpdateFolderRequest,
} from '../model/types';

export function getFolders() {
  return apiClient<FolderResponse[]>('/api/folders', {
    method: 'GET',
  });
}

export function createFolder(request: CreateFolderRequest) {
  return apiClient<FolderResponse>('/api/folders', {
    method: 'POST',
    data: request,
  });
}

export function updateFolder(id: number, request: UpdateFolderRequest) {
  return apiClient<FolderResponse>(`/api/folders/${id}`, {
    method: 'PUT',
    data: request,
  });
}

export function deleteFolder(id: number) {
  return apiClient<void>(`/api/folders/${id}`, {
    method: 'DELETE',
  });
}

export function getNotesByFolder(folderId: number) {
  return apiClient<NoteListItem[]>(`/api/folders/${folderId}/notes`, {
    method: 'GET',
  });
}

export function createNote(folderId: number, request: NoteRequest) {
  return apiClient<NoteResponse>(`/api/folders/${folderId}/notes`, {
    method: 'POST',
    data: request,
  });
}
