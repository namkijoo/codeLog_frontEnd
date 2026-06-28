'use client';

import type { useProblemRecord } from '../model/useProblemRecord';

type ProblemRecordFooterProps = Pick<
  ReturnType<typeof useProblemRecord>,
  'submitRecord' | 'isSubmitting'
>;

export function ProblemRecordFooter({
  submitRecord,
  isSubmitting,
}: ProblemRecordFooterProps) {
  return (
    <footer className="flex shrink-0 items-center justify-between border-t border-[#e5e3f5] bg-white px-8 py-4">
      <div className="flex items-center gap-5">
        <span className="text-secondary text-[13px] font-medium">
          총 성공 문제: <strong className="text-title font-bold">0</strong>개
        </span>
        <span className="text-secondary text-[13px] font-medium">
          현재 스트릭: <strong className="text-title font-bold">14</strong>일 🔥
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={submitRecord}
          disabled={isSubmitting}
          className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border-0 bg-[linear-gradient(135deg,#7c3aed,#6d28d9)] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_2px_10px_rgba(109,40,217,0.3)] transition-all hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(109,40,217,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting ? '기록 중...' : '🚀 풀이 기록하기'}
        </button>
      </div>
    </footer>
  );
}
