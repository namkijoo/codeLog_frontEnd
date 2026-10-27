'use client';

import { useRouter } from 'next/navigation';
import type { BoardResponse } from '../model/types';

function getDifficultyClass(difficulty: string): string {
  const lower = difficulty.toLowerCase();
  if (lower.includes('gold') || lower.includes('lv. 5') || lower.includes('lv. 4')) {
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }
  if (lower.includes('silver') || lower.includes('lv. 3') || lower.includes('lv. 2')) {
    return 'bg-slate-100 text-slate-600 border-slate-200';
  }
  return 'bg-[#f3f0ff] text-brand border-[#e9e0ff]';
}

type CompletedProblemsTableProps = {
  boards: BoardResponse[];
  formatDate: (value: string) => string;
  isLoading: boolean;
  error: string | null;
};

export function CompletedProblemsTable({
  boards,
  formatDate,
  isLoading,
  error,
}: CompletedProblemsTableProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="text-muted flex min-h-[320px] items-center justify-center rounded-xl border border-[#e5e3f5] bg-white text-[14px]">
        목록을 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-[#e5e3f5] bg-white px-6 text-center">
        <p className="text-secondary text-[14px] font-medium">{error}</p>
        <p className="text-muted mt-1 text-[13px]">잠시 후 다시 시도해 주세요.</p>
      </div>
    );
  }

  if (boards.length === 0) {
    return (
      <div className="text-muted flex min-h-[320px] items-center justify-center rounded-xl border border-[#e5e3f5] bg-white text-[14px]">
        완료된 문제가 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#e5e3f5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse">
          <thead>
            <tr className="border-b border-[#e5e3f5] bg-[#faf8ff]">
              {['날짜', '문제 번호', '문제 제목', '플랫폼', '난이도', '핵심 태그', '메모'].map(
                (label) => (
                  <th
                    key={label}
                    className="text-secondary px-4 py-3 text-left text-[11.5px] font-bold tracking-wide whitespace-nowrap"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {boards.map((board) => (
              <tr
                key={board.id}
                onClick={() => router.push(`/completed/${board.id}`)}
                className="cursor-pointer border-b border-[#f3f0ff] last:border-b-0 hover:bg-[#fcfbff]"
              >
                <td className="text-secondary px-4 py-3.5 text-[13px] whitespace-nowrap">
                  {formatDate(board.createdAt)}
                </td>
                <td className="text-secondary px-4 py-3.5 text-[13px] whitespace-nowrap">
                  {board.problemNumber}
                </td>
                <td className="text-title px-4 py-3.5 text-[13.5px] font-semibold">
                  {board.title}
                </td>
                <td className="text-body px-4 py-3.5 text-[13px] whitespace-nowrap">
                  {board.platformName}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[12px] font-semibold ${getDifficultyClass(board.difficulty)}`}
                  >
                    <span aria-hidden>🏆</span>
                    {board.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex max-w-[220px] flex-wrap gap-1">
                    {board.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-md bg-[#f3f0ff] px-2 py-0.5 text-[11.5px] font-semibold text-brand"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="text-secondary max-w-[240px] px-4 py-3.5 text-[13px]">
                  <p className="line-clamp-2">{board.memo || '—'}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
