'use client';

import { useNotes } from '../model/useNotes';
import { NotesEditor } from './NotesEditor';
import { NotesSidebar } from './NotesSidebar';
import { Spinner } from '@/shared/ui';

export function NotesFeature() {
  const {
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
    selectFolder,
    selectNote,
    handleCreateFolder,
    handleRenameFolder,
    handleDeleteFolder,
    handleCreateNote,
    handleDeleteNote,
  } = useNotes();

  if (isFoldersLoading && folders.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-[#f9f8ff]">
        <Spinner label="노트 로딩 중" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-[#f9f8ff] px-8">
        <p className="text-[14px] font-medium text-[#b91c1c]">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1">
      <NotesSidebar
        folders={folders}
        notes={notes}
        selectedFolderId={selectedFolderId}
        selectedNoteId={selectedNoteId}
        isFoldersLoading={isFoldersLoading}
        isNotesLoading={isNotesLoading}
        onSelectFolder={selectFolder}
        onSelectNote={selectNote}
        onCreateFolder={handleCreateFolder}
        onRenameFolder={handleRenameFolder}
        onDeleteFolder={handleDeleteFolder}
        onCreateNote={handleCreateNote}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {actionError && (
          <div className="border-b border-[#fecaca] bg-[#fef2f2] px-6 py-2 text-[12.5px] font-medium text-[#b91c1c]">
            {actionError}
          </div>
        )}
        <NotesEditor
          selectedFolder={selectedFolder}
          activeNote={activeNote}
          draftTitle={draftTitle}
          draftContent={draftContent}
          onTitleChange={setDraftTitle}
          onContentChange={setDraftContent}
          onDeleteNote={handleDeleteNote}
          isNoteLoading={isNoteLoading}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
