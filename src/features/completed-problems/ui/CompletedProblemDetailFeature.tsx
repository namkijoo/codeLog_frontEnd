'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CodeEditorPanel } from '@/features/problem-record/ui/CodeEditorPanel';
import { ProblemForm } from '@/features/problem-record/ui/ProblemForm';
import { useCompletedProblemDetail } from '../model/useCompletedProblemDetail';
import { useCompletedProblemEdit } from '../model/useCompletedProblemEdit';
import { CompletedProblemDetailFooter } from './CompletedProblemDetailFooter';

export function CompletedProblemDetailFeature() {
  const params = useParams<{ id: string }>();
  const boardId = Number.parseInt(params.id, 10);
  const parsedId = Number.isFinite(boardId) ? boardId : null;
  const { board, setBoard, isLoading, error } = useCompletedProblemDetail(parsedId);
  const edit = useCompletedProblemEdit(board, setBoard);

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

        <h1 className="text-title mb-6 text-[22px] font-extrabold tracking-tight">{edit.title}</h1>

        <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <ProblemForm
            readOnly={!edit.isEditing}
            platform={edit.platform}
            setPlatform={edit.setPlatform}
            problemNumber={edit.problemNumber}
            setProblemNumber={edit.setProblemNumber}
            difficulty={edit.difficulty}
            setDifficulty={edit.setDifficulty}
            title={edit.title}
            setTitle={edit.setTitle}
            problemUrl={edit.problemUrl}
            setProblemUrl={edit.setProblemUrl}
            tags={edit.tags}
            tagInput={edit.tagInput}
            setTagInput={edit.setTagInput}
            removeTag={edit.removeTag}
            handleTagKeyDown={edit.handleTagKeyDown}
            memo={edit.memo}
            setMemo={edit.setMemo}
          />
          <CodeEditorPanel
            readOnly={!edit.isEditing}
            language={edit.language}
            setLanguage={edit.setLanguage}
            code={edit.code}
            setCode={edit.setCode}
            codeStats={edit.codeStats}
          />
        </div>
      </div>

      <CompletedProblemDetailFooter
        isEditing={edit.isEditing}
        isSubmitting={edit.isSubmitting}
        startEdit={edit.startEdit}
        cancelEdit={edit.cancelEdit}
        saveEdit={edit.saveEdit}
      />
    </div>
  );
}
