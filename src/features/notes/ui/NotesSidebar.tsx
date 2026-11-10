'use client';

import type { FolderResponse, NoteListItem } from '../model/types';
import { Spinner } from '@/shared/ui';

type NotesSidebarProps = {
  folders: FolderResponse[];
  notes: NoteListItem[];
  selectedFolderId: number | null;
  selectedNoteId: number | null;
  isFoldersLoading: boolean;
  isNotesLoading: boolean;
  onSelectFolder: (folderId: number) => void;
  onSelectNote: (noteId: number) => void;
  onCreateFolder: () => void;
  onRenameFolder: (folderId: number) => void;
  onDeleteFolder: (folderId: number) => void;
  onCreateNote: () => void;
};

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M8 3h6l5 5v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NotesSidebar({
  folders,
  notes,
  selectedFolderId,
  selectedNoteId,
  isFoldersLoading,
  isNotesLoading,
  onSelectFolder,
  onSelectNote,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  onCreateNote,
}: NotesSidebarProps) {
  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-[#e5e3f5] bg-white">
      <div className="flex items-center justify-between border-b border-[#e5e3f5] px-4 py-3.5">
        <div>
          <p className="text-title text-[14px] font-bold">폴더</p>
          <p className="text-muted text-[11px] font-medium">Folders</p>
        </div>
        <button
          type="button"
          onClick={onCreateFolder}
          className="inline-flex size-8 items-center justify-center rounded-lg border border-[#e5e3f5] bg-white text-brand transition-colors hover:bg-[#f3f0ff]"
          aria-label="폴더 추가"
          title="폴더 추가"
        >
          <PlusIcon />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {isFoldersLoading ? (
          <div className="flex justify-center py-8">
            <Spinner label="폴더 로딩 중" />
          </div>
        ) : folders.length === 0 ? (
          <p className="text-muted px-2 py-6 text-center text-[12.5px] leading-relaxed">
            + 버튼으로 첫 폴더를
            <br />
            만들어 보세요
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {folders.map((folder) => {
              const isActive = folder.id === selectedFolderId;
              return (
                <li key={folder.id}>
                  <div
                    className={`group flex items-center gap-1 rounded-lg ${
                      isActive ? 'bg-[#f3f0ff]' : 'hover:bg-[#faf8ff]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectFolder(folder.id)}
                      className={`flex min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-left text-[13px] font-semibold ${
                        isActive ? 'text-brand' : 'text-secondary'
                      }`}
                    >
                      <span className={isActive ? 'text-brand' : 'text-muted'}>
                        <FolderIcon />
                      </span>
                      <span className="truncate">{folder.title}</span>
                      <span className="text-muted ml-auto shrink-0 text-[11px] font-medium">
                        {folder.noteCount}
                      </span>
                    </button>
                    <div className="mr-1 hidden shrink-0 items-center gap-0.5 group-hover:flex">
                      <button
                        type="button"
                        onClick={() => onRenameFolder(folder.id)}
                        className="rounded px-1.5 py-1 text-[10px] font-semibold text-secondary hover:bg-white"
                        title="이름 변경"
                      >
                        이름
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteFolder(folder.id)}
                        className="rounded px-1.5 py-1 text-[10px] font-semibold text-[#b91c1c] hover:bg-white"
                        title="삭제"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {selectedFolderId != null && (
          <div className="mt-4 border-t border-[#e5e3f5] pt-3">
            <div className="mb-2 flex items-center justify-between px-2">
              <p className="text-muted text-[11px] font-bold tracking-wide uppercase">Notes</p>
              <button
                type="button"
                onClick={onCreateNote}
                className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11.5px] font-semibold text-brand hover:bg-[#f3f0ff]"
              >
                <PlusIcon />
                새 노트
              </button>
            </div>

            {isNotesLoading ? (
              <div className="flex justify-center py-6">
                <Spinner label="노트 로딩 중" />
              </div>
            ) : notes.length === 0 ? (
              <p className="text-muted px-2 py-4 text-[12px]">이 폴더에 노트가 없습니다.</p>
            ) : (
              <ul className="flex flex-col gap-0.5">
                {notes.map((note) => {
                  const isActive = note.id === selectedNoteId;
                  return (
                    <li key={note.id}>
                      <button
                        type="button"
                        onClick={() => onSelectNote(note.id)}
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors ${
                          isActive
                            ? 'bg-[#f3f0ff] text-brand'
                            : 'text-secondary hover:bg-[#faf8ff] hover:text-body'
                        }`}
                      >
                        <span className={isActive ? 'text-brand' : 'text-muted'}>
                          <PageIcon />
                        </span>
                        <span className="truncate">{note.title || '제목 없음'}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
