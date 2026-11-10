'use client';

import { useState } from 'react';
import type { FolderResponse } from '../model/types';
import { Spinner } from '@/shared/ui';

type FolderGridProps = {
  folders: FolderResponse[];
  isLoading: boolean;
  onOpenFolder: (folderId: number) => void;
  onCreateFolder: () => void;
  onRenameFolder: (folderId: number) => void;
  onDeleteFolder: (folderId: number) => void;
};

function LargeFolderIcon({ active }: { active: boolean }) {
  const body = active ? '#8b5cf6' : '#a78bfa';
  const tab = active ? '#7c3aed' : '#8b5cf6';
  const paper = active ? '#ede9fe' : '#f5f3ff';

  return (
    <svg width="88" height="72" viewBox="0 0 88 72" fill="none" aria-hidden>
      <path
        d="M6 18c0-3.3 2.7-6 6-6h18.2l6.4 6H76c3.3 0 6 2.7 6 6v36c0 3.3-2.7 6-6 6H12c-3.3 0-6-2.7-6-6V18z"
        fill={body}
      />
      <path d="M6 22h76v4H6z" fill={tab} opacity="0.35" />
      <path
        d="M14 30h60c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4H14c-2.2 0-4-1.8-4-4V34c0-2.2 1.8-4 4-4z"
        fill={paper}
      />
      <path d="M6 18c0-3.3 2.7-6 6-6h16l5 5H12c-3.3 0-6 2.7-6 6v1z" fill={tab} />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function FolderGrid({
  folders,
  isLoading,
  onOpenFolder,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
}: FolderGridProps) {
  const [focusedId, setFocusedId] = useState<number | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f9f8ff]">
      <div className="flex items-center justify-between border-b border-[#e5e3f5] bg-white px-8 py-4">
        <div>
          <h1 className="text-title text-[20px] font-extrabold tracking-tight">노트</h1>
          <p className="text-muted mt-0.5 text-[12.5px] font-medium">
            폴더를 더블클릭해서 들어가세요
          </p>
        </div>
        <button
          type="button"
          onClick={onCreateFolder}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <PlusIcon />
          새 폴더
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner label="폴더 로딩 중" />
          </div>
        ) : folders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <LargeFolderIcon active={false} />
            <p className="text-title mt-5 text-[16px] font-bold">아직 폴더가 없습니다</p>
            <p className="text-muted mt-1.5 text-[13px]">새 폴더를 만들어 노트를 정리해 보세요</p>
          </div>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-5">
            {folders.map((folder) => {
              const isFocused = folder.id === focusedId;
              return (
                <li key={folder.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => setFocusedId(folder.id)}
                    onDoubleClick={() => onOpenFolder(folder.id)}
                    className={`flex w-full flex-col items-center rounded-2xl px-3 py-4 transition-colors ${
                      isFocused ? 'bg-[#ede9fe]' : 'hover:bg-white'
                    }`}
                  >
                    <LargeFolderIcon active={isFocused} />
                    <span className="text-title mt-3 w-full truncate text-center text-[13.5px] font-bold">
                      {folder.title}
                    </span>
                    <span className="text-muted mt-0.5 text-[11.5px] font-medium">
                      노트 {folder.noteCount}개
                    </span>
                  </button>

                  {isFocused && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => onRenameFolder(folder.id)}
                        className="rounded-md bg-white px-1.5 py-1 text-[10px] font-semibold text-secondary shadow-sm"
                      >
                        이름
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteFolder(folder.id)}
                        className="rounded-md bg-white px-1.5 py-1 text-[10px] font-semibold text-[#b91c1c] shadow-sm"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
