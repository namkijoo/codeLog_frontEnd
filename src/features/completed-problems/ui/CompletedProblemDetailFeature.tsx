'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { CodeEditorPanel } from '@/features/problem-record/ui/CodeEditorPanel';
import { ProblemForm } from '@/features/problem-record/ui/ProblemForm';
import type { Difficulty, Platform } from '@/features/problem-record/model/constants';
import { resolveLanguageId } from '../lib/resolveLanguageId';
import { useCompletedProblemDetail } from '../model/useCompletedProblemDetail';

const noop = () => {};

export function CompletedProblemDetailFeature() {
  const params = useParams<{ id: string }>();
  const boardId = Number.parseInt(params.id, 10);
  const parsedId = Number.isFinite(boardId) ? boardId : null;
  const { board, isLoading, error } = useCompletedProblemDetail(parsedId);

  const language = board ? resolveLanguageId(board.language) : 'javascript';
  const codeStats = useMemo(() => {
    if (!board) return { lines: 0, chars: 0 };
    const lines = board.code.split('\n').length;
    const chars = board.code.length;
    return { lines, chars };
  }, [board]);

  if (isLoading) {
    return (
      <div className="text-muted flex min-h-0 flex-1 items-center justify-center bg-[#f9f8ff] text-[14px]">
        문제를 불러오는 중...
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-[#f9f8ff] px-6">
        <p className="text-secondary text-[14px] font-medium">{error ?? '문제를 찾을 수 없습니다.'}</p>
        <Link
          href="/completed"
          className="text-brand text-[13px] font-semibold no-underline hover:underline"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f9f8ff]">
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <Link
          href="/completed"
          className="text-muted mb-5 inline-block text-xs font-semibold no-underline transition-colors hover:text-brand"
        >
          ← 완료된 문제 리스트
        </Link>

        <h1 className="text-title mb-6 text-[22px] font-extrabold tracking-tight">{board.title}</h1>

        <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <ProblemForm
            readOnly
            platform={board.platformName as Platform}
            setPlatform={noop}
            problemNumber={String(board.problemNumber)}
            setProblemNumber={noop}
            difficulty={board.difficulty as Difficulty}
            setDifficulty={noop}
            title={board.title}
            setTitle={noop}
            problemUrl={board.problemUrl}
            setProblemUrl={noop}
            tags={board.tags}
            tagInput=""
            setTagInput={noop}
            removeTag={noop}
            handleTagKeyDown={noop}
            memo={board.memo}
            setMemo={noop}
          />
          <CodeEditorPanel
            readOnly
            language={language}
            setLanguage={noop}
            code={board.code}
            setCode={noop}
            codeStats={codeStats}
          />
        </div>
      </div>
    </div>
  );
}
