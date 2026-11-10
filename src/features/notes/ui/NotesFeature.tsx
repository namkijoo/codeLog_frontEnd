'use client';

import { useNotes } from '../model/useNotes';
import { FolderContents } from './FolderContents';
import { FolderGrid } from './FolderGrid';
import { NotesEditor } from './NotesEditor';
import { Spinner } from '@/shared/ui';

export function NotesFeature() {
  const {
    folders,
    notes,
    selectedFolder,
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
    notePosition,
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
    <div className="flex min-h-0 flex-1 flex-col">
      {actionError && (
        <div className="border-b border-[#fecaca] bg-[#fef2f2] px-6 py-2 text-[12.5px] font-medium text-[#b91c1c]">
          {actionError}
        </div>
      )}

      {selectedFolder == null ? (
        <FolderGrid
          folders={folders}
          isLoading={isFoldersLoading}
          onOpenFolder={openFolder}
          onCreateFolder={handleCreateFolder}
          onRenameFolder={handleRenameFolder}
          onDeleteFolder={handleDeleteFolder}
        />
      ) : selectedNoteId != null ? (
        <NotesEditor
          selectedFolder={selectedFolder}
          activeNote={activeNote}
          draftTitle={draftTitle}
          draftContent={draftContent}
          onTitleChange={setDraftTitle}
          onContentChange={setDraftContent}
          onBack={leaveNote}
          onDeleteNote={handleDeleteNote}
          onPrevNote={goToPrevNote}
          onNextNote={goToNextNote}
          hasPrevNote={hasPrevNote}
          hasNextNote={hasNextNote}
          notePosition={notePosition}
          isNoteLoading={isNoteLoading}
          isSaving={isSaving}
        />
      ) : (
        <FolderContents
          folder={selectedFolder}
          notes={notes}
          isLoading={isNotesLoading}
          onBack={leaveFolder}
          onOpenNote={openNote}
          onCreateNote={handleCreateNote}
        />
      )}
    </div>
  );
}
