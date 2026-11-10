'use client';

import type { FolderResponse, NoteResponse } from '../model/types';
import { Spinner } from '@/shared/ui';

type NotesEditorProps = {
  selectedFolder: FolderResponse;
  activeNote: NoteResponse | null;
  draftTitle: string;
  draftContent: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onBack: () => void;
  onDeleteNote: () => void;
  onPrevNote: () => void;
  onNextNote: () => void;
  hasPrevNote: boolean;
  hasNextNote: boolean;
  notePosition: { current: number; total: number } | null;
  isNoteLoading: boolean;
  isSaving: boolean;
};

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NotesEditor({
  selectedFolder,
  activeNote,
  draftTitle,
  draftContent,
  onTitleChange,
  onContentChange,
  onBack,
  onDeleteNote,
  onPrevNote,
  onNextNote,
  hasPrevNote,
  hasNextNote,
  notePosition,
  isNoteLoading,
  isSaving,
}: NotesEditorProps) {
  if (isNoteLoading || !activeNote) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#f9f8ff]">
        <Spinner label="노트 로딩 중" />
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f9f8ff]">
      <div className="flex items-center justify-between border-b border-[#e5e3f5] bg-white px-6 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 rounded-lg border border-[#e5e3f5] bg-white px-2.5 py-1.5 text-[12.5px] font-semibold text-secondary transition-colors hover:bg-[#faf8ff]"
          >
            <BackIcon />
            폴더로
          </button>
          <p className="text-muted truncate text-[12px] font-medium">
            {selectedFolder.title}
            <span className="mx-1.5 text-[#d4d0e8]">/</span>
            <span className="text-secondary">{draftTitle.trim() || '제목 없음'}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {notePosition && (
            <span className="text-muted text-[12px] font-medium">
              {notePosition.current} / {notePosition.total}
            </span>
          )}
          <span className="text-muted text-[12px] font-medium">
            {isSaving ? '저장 중…' : '저장됨'}
          </span>
          <button
            type="button"
            onClick={onDeleteNote}
            className="rounded-lg border border-[#fecaca] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#b91c1c] transition-colors hover:bg-[#fef2f2]"
          >
            삭제
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1">
        <button
          type="button"
          onClick={onPrevNote}
          disabled={!hasPrevNote}
          aria-label="이전 노트"
          className="absolute top-1/2 left-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e3f5] bg-white text-brand shadow-sm transition-all hover:bg-[#f3f0ff] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
        >
          <ChevronLeftIcon />
        </button>

        <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-16 py-8 sm:px-20">
          <input
            type="text"
            value={draftTitle}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="제목 없음"
            className="text-title mb-4 w-full border-none bg-transparent text-[28px] font-extrabold tracking-tight outline-none placeholder:text-[#c4b5fd]"
            maxLength={200}
          />
          <textarea
            value={draftContent}
            onChange={(event) => onContentChange(event.target.value)}
            placeholder="내용을 입력하세요…"
            className="text-body min-h-0 w-full flex-1 resize-none border-none bg-transparent text-[15px] leading-7 outline-none placeholder:text-muted"
          />
        </div>

        <button
          type="button"
          onClick={onNextNote}
          disabled={!hasNextNote}
          aria-label="다음 노트"
          className="absolute top-1/2 right-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e3f5] bg-white text-brand shadow-sm transition-all hover:bg-[#f3f0ff] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
