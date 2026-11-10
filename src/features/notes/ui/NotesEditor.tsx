'use client';

import type { FolderResponse, NoteResponse } from '../model/types';
import { Spinner } from '@/shared/ui';

type NotesEditorProps = {
  selectedFolder: FolderResponse | null;
  activeNote: NoteResponse | null;
  draftTitle: string;
  draftContent: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onDeleteNote: () => void;
  isNoteLoading: boolean;
  isSaving: boolean;
};

export function NotesEditor({
  selectedFolder,
  activeNote,
  draftTitle,
  draftContent,
  onTitleChange,
  onContentChange,
  onDeleteNote,
  isNoteLoading,
  isSaving,
}: NotesEditorProps) {
  if (!selectedFolder) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#f9f8ff] px-8">
        <div className="text-center">
          <p className="text-title text-[18px] font-bold">노트를 시작할 폴더를 만드세요</p>
          <p className="text-muted mt-2 text-[13px]">왼쪽 + 버튼으로 폴더를 추가할 수 있습니다.</p>
        </div>
      </div>
    );
  }

  if (isNoteLoading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#f9f8ff]">
        <Spinner label="노트 로딩 중" />
      </div>
    );
  }

  if (!activeNote) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#f9f8ff] px-8">
        <div className="text-center">
          <p className="text-title text-[18px] font-bold">{selectedFolder.title}</p>
          <p className="text-muted mt-2 text-[13px]">
            왼쪽에서 노트를 선택하거나 &ldquo;새 노트&rdquo;로 작성하세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f9f8ff]">
      <div className="flex items-center justify-between border-b border-[#e5e3f5] bg-white px-6 py-3">
        <p className="text-muted text-[12px] font-medium">
          {selectedFolder.title}
          <span className="mx-1.5 text-[#d4d0e8]">/</span>
          <span className="text-secondary">{draftTitle.trim() || '제목 없음'}</span>
        </p>
        <div className="flex items-center gap-3">
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

      <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-6 py-8">
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
    </div>
  );
}
