export type FolderResponse = {
  id: number;
  title: string;
  sortOrder: number;
  noteCount: number;
  createdAt: string;
  updatedAt: string;
};

export type NoteListItem = {
  id: number;
  folderId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteResponse = {
  id: number;
  folderId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateFolderRequest = {
  title: string;
};

export type UpdateFolderRequest = {
  title: string;
  sortOrder?: number;
};

export type NoteRequest = {
  title: string;
  content: string;
};
