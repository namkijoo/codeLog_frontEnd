'use client';

import { useState } from 'react';
import type { FolderResponse, NoteListItem } from '../model/types';
import { Spinner } from '@/shared/ui';

type FolderContentsProps = {
  folder: FolderResponse;
  notes: NoteListItem[];
  isLoading: boolean;
  onBack: () => void;
  onOpenNote: (noteId: number) => void;
  onCreateNote: () => void;
};

function NoteDocIcon({ active }: { active: boolean }) {
  const paper = active ? '#ede9fe' : '#ffffff';
  const border = active ? '#8b5cf6' : '#ddd6fe';
  const fold = active ? '#c4b5fd' : '#e9e5ff';

  return (
    <svg width="64" height="80" viewBox="0 0 64 80" fill="none" aria-hidden>
      <path
        d="M8 6c0-2.2 1.8-4 4-4h28l16 16v54c0 2.2-1.8 4-4 4H12c-2.2 0-4-1.8-4-4V6z"
        fill={paper}
        stroke={border}
        strokeWidth="2"
      />
      <path d="M40 2v12c0 2.2 1.8 4 4 4h12L40 2z" fill={fold} />
      <path d="M18 36h28M18 46h28M18 56h18" stroke={border} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FolderContents({
  folder,
  notes,
  isLoading,
  onBack,
  onOpenNote,
  onCreateNote,
}: FolderContentsProps) {
  const [focusedId, setFocusedId] = useState<number | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f9f8ff]">
      <div className="flex items-center justify-between border-b border-[#e5e3f5] bg-white px-8 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 rounded-lg border border-[#e5e3f5] bg-white px-2.5 py-1.5 text-[12.5px] font-semibold text-secondary transition-colors hover:bg-[#faf8ff]"
          >
            <BackIcon />
            뒤로
          </button>
          <div className="min-w-0">
            <h1 className="text-title truncate text-[20px] font-extrabold tracking-tight">
              {folder.title}
            </h1>
            <p className="text-muted mt-0.5 text-[12.5px] font-medium">
              노트를 더블클릭해서 열어보세요
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCreateNote}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <PlusIcon />
          새 노트
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner label="노트 로딩 중" />
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <NoteDocIcon active={false} />
            <p className="text-title mt-5 text-[16px] font-bold">비어 있는 폴더입니다</p>
            <p className="text-muted mt-1.5 text-[13px]">새 노트를 추가해 글을 작성하세요</p>
          </div>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-5">
            {notes.map((note) => {
              const isFocused = note.id === focusedId;
              return (
                <li key={note.id}>
                  <button
                    type="button"
                    onClick={() => setFocusedId(note.id)}
                    onDoubleClick={() => onOpenNote(note.id)}
                    className={`flex w-full flex-col items-center rounded-2xl px-3 py-4 transition-colors ${
                      isFocused ? 'bg-[#ede9fe]' : 'hover:bg-white'
                    }`}
                  >
                    <NoteDocIcon active={isFocused} />
                    <span className="text-title mt-3 w-full truncate text-center text-[13px] font-bold">
                      {note.title || '제목 없음'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
