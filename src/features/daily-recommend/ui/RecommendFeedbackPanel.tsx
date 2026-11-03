'use client';

import { Spinner } from '@/shared/ui';
import type { DailyRecommendFeedback } from '../model/types';

type RecommendFeedbackPanelProps = {
  feedback: DailyRecommendFeedback | null | undefined;
  isLoading: boolean;
  error: string | null;
  hasRequested: boolean;
  onRequest: () => void;
};

export function RecommendFeedbackPanel({
  feedback,
  isLoading,
  error,
  hasRequested,
  onRequest,
}: RecommendFeedbackPanelProps) {
  const strengths = feedback?.strengths ?? [];
  const improvements = feedback?.improvements ?? [];
  const hasContent =
    Boolean(feedback?.focusToday) || strengths.length > 0 || improvements.length > 0;

  return (
    <section className="flex min-h-[320px] flex-col rounded-xl border border-[#e5e3f5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3 border-b border-[#e5e3f5] px-5 py-4">
        <div>
          <h2 className="text-title text-[16px] font-extrabold tracking-tight">피드백 받기</h2>
          <p className="text-muted mt-0.5 text-[12.5px] font-medium">AI Coaching Feedback</p>
        </div>
        <button
          type="button"
          onClick={onRequest}
          disabled={isLoading}
          className="btn-outline w-auto shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {hasRequested ? '다시 받기' : '피드백 받기'}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {isLoading && (
          <div className="flex flex-1 items-center justify-center">
            <Spinner label="피드백을 준비하는 중" />
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <p className="text-secondary text-[13.5px] font-medium">{error}</p>
            <button type="button" onClick={onRequest} className="btn-outline w-auto">
              다시 시도
            </button>
          </div>
        )}

        {!isLoading && !error && !hasRequested && (
          <div className="text-secondary flex flex-1 flex-col items-center justify-center gap-2 text-center text-[13.5px]">
            <p>버튼을 누르면</p>
            <p>학습 피드백이 여기에 표시됩니다.</p>
          </div>
        )}

        {!isLoading && !error && hasRequested && !hasContent && (
          <div className="text-muted flex flex-1 items-center justify-center text-[13.5px]">
            표시할 피드백이 없습니다.
          </div>
        )}

        {!isLoading && !error && hasContent && feedback && (
          <div className="flex flex-col gap-5">
            {feedback.focusToday && (
              <div>
                <p className="text-secondary mb-1.5 text-[11.5px] font-bold tracking-wide">
                  오늘의 포커스
                </p>
                <p className="text-body text-[13.5px] leading-relaxed">{feedback.focusToday}</p>
              </div>
            )}

            {strengths.length > 0 && (
              <div>
                <p className="text-secondary mb-2 text-[11.5px] font-bold tracking-wide">강점</p>
                <ul className="flex flex-col gap-1.5">
                  {strengths.map((item) => (
                    <li key={item} className="text-body text-[13px] leading-snug">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {improvements.length > 0 && (
              <div>
                <p className="text-secondary mb-2 text-[11.5px] font-bold tracking-wide">
                  보완 포인트
                </p>
                <ul className="flex flex-col gap-1.5">
                  {improvements.map((item) => (
                    <li key={item} className="text-body text-[13px] leading-snug">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
