'use client';

import type { useCompletedProblemEdit } from '../model/useCompletedProblemEdit';

type CompletedProblemDetailFooterProps = Pick<
  ReturnType<typeof useCompletedProblemEdit>,
  'isEditing' | 'isSubmitting' | 'startEdit' | 'cancelEdit' | 'saveEdit'
>;

export function CompletedProblemDetailFooter({
  isEditing,
  isSubmitting,
  startEdit,
  cancelEdit,
  saveEdit,
}: CompletedProblemDetailFooterProps) {
  return (
    <footer className="flex shrink-0 items-center justify-end border-t border-[#e5e3f5] bg-white px-8 py-4">
      <div className="flex items-center gap-2.5">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={cancelEdit}
              disabled={isSubmitting}
              className="cursor-pointer rounded-[9px] border-[1.5px] border-brand bg-white px-5 py-2.5 text-[13.5px] font-semibold text-brand transition-all hover:bg-[#faf8ff] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              취소
            </button>
            <button
              type="button"
              onClick={saveEdit}
              disabled={isSubmitting}
              className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border-0 bg-[linear-gradient(135deg,#7c3aed,#6d28d9)] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_2px_10px_rgba(109,40,217,0.3)] transition-all hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(109,40,217,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isSubmitting ? '저장 중...' : '저장하기'}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={startEdit}
            className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border-0 bg-[linear-gradient(135deg,#7c3aed,#6d28d9)] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_2px_10px_rgba(109,40,217,0.3)] transition-all hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(109,40,217,0.4)] active:scale-[0.98]"
          >
            수정
          </button>
        )}
      </div>
    </footer>
  );
}
