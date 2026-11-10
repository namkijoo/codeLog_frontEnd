'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createFolder,
  createNote,
  deleteFolder,
  getFolders,
  getNotesByFolder,
  updateFolder,
} from '../api/folders';
import { deleteNote, getNote, updateNote } from '../api/notes';
import type { FolderResponse, NoteListItem, NoteResponse } from './types';

const SAVE_DEBOUNCE_MS = 450;

export function useNotes() {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [notes, setNotes] = useState<NoteListItem[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [activeNote, setActiveNote] = useState<NoteResponse | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState('');

  const [isFoldersLoading, setIsFoldersLoading] = useState(true);
  const [isNotesLoading, setIsNotesLoading] = useState(false);
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextSaveRef = useRef(false);
  const activeNoteIdRef = useRef<number | null>(null);
  const draftRef = useRef({ title: '', content: '' });
  const activeNoteRef = useRef<NoteResponse | null>(null);

  useEffect(() => {
    activeNoteIdRef.current = activeNote?.id ?? null;
    activeNoteRef.current = activeNote;
  }, [activeNote]);

  useEffect(() => {
    draftRef.current = { title: draftTitle, content: draftContent };
  }, [draftTitle, draftContent]);

  const loadFolders = useCallback(async () => {
    setIsFoldersLoading(true);
    setError(null);

    try {
      const data = await getFolders();
      setFolders(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : '폴더를 불러오지 못했습니다.';
      setError(message);
      setFolders([]);
    } finally {
      setIsFoldersLoading(false);
    }
  }, []);

  const loadNotes = useCallback(async (folderId: number) => {
    setIsNotesLoading(true);
    setActionError(null);

    try {
      const data = await getNotesByFolder(folderId);
      setNotes(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : '노트를 불러오지 못했습니다.';
      setActionError(message);
      setNotes([]);
    } finally {
      setIsNotesLoading(false);
    }
  }, []);

  const loadNoteDetail = useCallback(async (noteId: number) => {
    setIsNoteLoading(true);
    setActionError(null);

    try {
      const note = await getNote(noteId);
      skipNextSaveRef.current = true;
      setActiveNote(note);
      setDraftTitle(note.title);
      setDraftContent(note.content);
    } catch (err) {
      const message = err instanceof Error ? err.message : '노트를 불러오지 못했습니다.';
      setActionError(message);
      setActiveNote(null);
      setDraftTitle('');
      setDraftContent('');
    } finally {
      setIsNoteLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFolders();
  }, [loadFolders]);

  useEffect(() => {
    if (selectedFolderId == null) {
      setNotes([]);
      return;
    }
    void loadNotes(selectedFolderId);
  }, [selectedFolderId, loadNotes]);

  useEffect(() => {
    if (selectedNoteId == null) {
      setActiveNote(null);
      setDraftTitle('');
      setDraftContent('');
      return;
    }
    void loadNoteDetail(selectedNoteId);
  }, [selectedNoteId, loadNoteDetail]);

  const persistNote = useCallback(async (noteId: number, title: string, content: string) => {
    const trimmedTitle = title.trim() || '제목 없음';
    setIsSaving(true);
    setActionError(null);

    try {
      const updated = await updateNote(noteId, {
        title: trimmedTitle,
        content,
      });

      if (activeNoteIdRef.current === noteId) {
        setActiveNote(updated);
        setDraftTitle(updated.title);
      }

      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteId
            ? {
                ...note,
                title: updated.title,
                updatedAt: updated.updatedAt,
              }
            : note,
        ),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : '노트 저장에 실패했습니다.';
      setActionError(message);
    } finally {
      setIsSaving(false);
    }
  }, []);

  useEffect(() => {
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    if (!activeNote) return;
    if (draftTitle === activeNote.title && draftContent === activeNote.content) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    const noteId = activeNote.id;
    saveTimerRef.current = setTimeout(() => {
      void persistNote(noteId, draftTitle, draftContent);
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [activeNote, draftTitle, draftContent, persistNote]);

  const openFolder = useCallback((folderId: number) => {
    setSelectedFolderId(folderId);
    setSelectedNoteId(null);
    setActiveNote(null);
    setDraftTitle('');
    setDraftContent('');
    setActionError(null);
  }, []);

  const leaveFolder = useCallback(() => {
    setSelectedFolderId(null);
    setSelectedNoteId(null);
    setActiveNote(null);
    setDraftTitle('');
    setDraftContent('');
    setNotes([]);
    setActionError(null);
  }, []);

  const flushPendingSave = useCallback(async () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    const note = activeNoteRef.current;
    if (!note) return;

    const { title, content } = draftRef.current;
    if (title === note.title && content === note.content) return;

    await persistNote(note.id, title, content);
  }, [persistNote]);

  const openNote = useCallback((noteId: number) => {
    setSelectedNoteId(noteId);
    setActionError(null);
  }, []);

  const leaveNote = useCallback(() => {
    void flushPendingSave();
    setSelectedNoteId(null);
    setActiveNote(null);
    setDraftTitle('');
    setDraftContent('');
    setActionError(null);
  }, [flushPendingSave]);

  const currentNoteIndex =
    selectedNoteId == null ? -1 : notes.findIndex((note) => note.id === selectedNoteId);
  const hasPrevNote = currentNoteIndex > 0;
  const hasNextNote = currentNoteIndex >= 0 && currentNoteIndex < notes.length - 1;

  const goToPrevNote = useCallback(() => {
    if (currentNoteIndex <= 0) return;
    const prev = notes[currentNoteIndex - 1];
    if (!prev) return;
    void (async () => {
      await flushPendingSave();
      setSelectedNoteId(prev.id);
      setActionError(null);
    })();
  }, [currentNoteIndex, notes, flushPendingSave]);

  const goToNextNote = useCallback(() => {
    if (currentNoteIndex < 0 || currentNoteIndex >= notes.length - 1) return;
    const next = notes[currentNoteIndex + 1];
    if (!next) return;
    void (async () => {
      await flushPendingSave();
      setSelectedNoteId(next.id);
      setActionError(null);
    })();
  }, [currentNoteIndex, notes, flushPendingSave]);

  const handleCreateFolder = useCallback(async () => {
    const title = window.prompt('새 폴더 이름');
    if (title == null) return;

    const trimmed = title.trim();
    if (!trimmed) {
      setActionError('폴더 제목이 필요합니다.');
      return;
    }

    setActionError(null);
    try {
      const created = await createFolder({ title: trimmed });
      setFolders((prev) => [...prev, created].sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err) {
      const message = err instanceof Error ? err.message : '폴더 생성에 실패했습니다.';
      setActionError(message);
    }
  }, []);

  const handleRenameFolder = useCallback(
    async (folderId: number) => {
      const current = folders.find((folder) => folder.id === folderId);
      if (!current) return;

      const title = window.prompt('폴더 이름 변경', current.title);
      if (title == null) return;

      const trimmed = title.trim();
      if (!trimmed) {
        setActionError('폴더 제목이 필요합니다.');
        return;
      }

      setActionError(null);
      try {
        const updated = await updateFolder(folderId, {
          title: trimmed,
          sortOrder: current.sortOrder,
        });
        setFolders((prev) =>
          prev
            .map((folder) => (folder.id === folderId ? updated : folder))
            .sort((a, b) => a.sortOrder - b.sortOrder),
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : '폴더 이름 변경에 실패했습니다.';
        setActionError(message);
      }
    },
    [folders],
  );

  const handleDeleteFolder = useCallback(
    async (folderId: number) => {
      const current = folders.find((folder) => folder.id === folderId);
      if (!current) return;

      const confirmed = window.confirm(
        `"${current.title}" 폴더와 안의 노트를 모두 삭제할까요?`,
      );
      if (!confirmed) return;

      setActionError(null);
      try {
        await deleteFolder(folderId);
        setFolders((prev) => prev.filter((folder) => folder.id !== folderId));

        if (selectedFolderId === folderId) {
          setSelectedFolderId(null);
          setSelectedNoteId(null);
          setActiveNote(null);
          setDraftTitle('');
          setDraftContent('');
          setNotes([]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : '폴더 삭제에 실패했습니다.';
        setActionError(message);
      }
    },
    [folders, selectedFolderId],
  );

  const handleCreateNote = useCallback(async () => {
    if (selectedFolderId == null) {
      setActionError('먼저 폴더를 열어주세요.');
      return;
    }

    setActionError(null);
    try {
      const created = await createNote(selectedFolderId, {
        title: '새 노트',
        content: '',
      });

      setNotes((prev) => [
        {
          id: created.id,
          folderId: created.folderId,
          title: created.title,
          createdAt: created.createdAt,
          updatedAt: created.updatedAt,
        },
        ...prev,
      ]);
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === selectedFolderId
            ? { ...folder, noteCount: folder.noteCount + 1 }
            : folder,
        ),
      );

      skipNextSaveRef.current = true;
      setSelectedNoteId(created.id);
      setActiveNote(created);
      setDraftTitle(created.title);
      setDraftContent(created.content);
    } catch (err) {
      const message = err instanceof Error ? err.message : '노트 생성에 실패했습니다.';
      setActionError(message);
    }
  }, [selectedFolderId]);

  const handleDeleteNote = useCallback(async () => {
    if (!activeNote || selectedFolderId == null) return;

    const confirmed = window.confirm(`"${activeNote.title}" 노트를 삭제할까요?`);
    if (!confirmed) return;

    setActionError(null);
    try {
      await deleteNote(activeNote.id);
      setNotes((prev) => prev.filter((note) => note.id !== activeNote.id));
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === selectedFolderId
            ? { ...folder, noteCount: Math.max(0, folder.noteCount - 1) }
            : folder,
        ),
      );
      setSelectedNoteId(null);
      setActiveNote(null);
      setDraftTitle('');
      setDraftContent('');
    } catch (err) {
      const message = err instanceof Error ? err.message : '노트 삭제에 실패했습니다.';
      setActionError(message);
    }
  }, [activeNote, selectedFolderId]);

  const selectedFolder = folders.find((folder) => folder.id === selectedFolderId) ?? null;

  return {
    folders,
    notes,
    selectedFolder,
    selectedFolderId,
    selectedNoteId,
    activeNote,
    draftTitle,
    draftContent,
    setDraftTitle,
    setDraftContent,
    isFoldersLoading,
    isNotesLoading,
    isNoteLoading,
    isSaving,
    error,
    actionError,
    openFolder,
    leaveFolder,
    openNote,
    leaveNote,
    hasPrevNote,
    hasNextNote,
    goToPrevNote,
    goToNextNote,
    notePosition:
      currentNoteIndex >= 0 && notes.length > 0
        ? { current: currentNoteIndex + 1, total: notes.length }
        : null,
    handleCreateFolder,
    handleRenameFolder,
    handleDeleteFolder,
    handleCreateNote,
    handleDeleteNote,
  };
}
