'use client';

import type { RecommendationItem } from '../model/types';
import { RecommendProblemRow } from './RecommendProblemRow';

type RecommendProblemsPanelProps = {
  recommendations: RecommendationItem[];
  date?: string;
  isLoading: boolean;
  error: string | null;
  hasRequested: boolean;
  onRequest: () => void;
};

export function RecommendProblemsPanel({
  recommendations,
  date,
  isLoading,
  error,
  hasRequested,
  onRequest,
}: RecommendProblemsPanelProps) {
  return (
    <section className="flex min-h-[320px] flex-col rounded-xl border border-[#e5e3f5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3 border-b border-[#e5e3f5] px-5 py-4">
        <div>
          <h2 className="text-title text-[16px] font-extrabold tracking-tight">오늘의 문제 추천</h2>
          <p className="text-muted mt-0.5 text-[12.5px] font-medium">
            {date ? `${date} · AI Daily Recommend` : 'AI Daily Recommend'}
          </p>
        </div>
        <button
          type="button"
          onClick={onRequest}
          disabled={isLoading}
          className="btn-outline w-auto shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {hasRequested ? '다시 추천받기' : '추천 받기'}
        </button>
      </div>

      <div className="flex flex-1 flex-col">
        {isLoading && (
          <div className="text-muted flex flex-1 items-center justify-center px-5 py-10 text-[13.5px]">
            맞춤 문제를 추천하는 중...
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-10 text-center">
            <p className="text-secondary text-[13.5px] font-medium">{error}</p>
            <button type="button" onClick={onRequest} className="btn-outline w-auto">
              다시 시도
            </button>
          </div>
        )}

        {!isLoading && !error && !hasRequested && (
          <div className="text-secondary flex flex-1 items-center justify-center px-5 py-10 text-center text-[13.5px]">
            버튼을 누르면 오늘의 맞춤 문제가 이 카드에 표시됩니다.
          </div>
        )}

        {!isLoading && !error && hasRequested && recommendations.length === 0 && (
          <div className="text-muted flex flex-1 items-center justify-center px-5 py-10 text-[13.5px]">
            오늘은 추천할 문제가 없습니다.
          </div>
        )}

        {!isLoading && !error && recommendations.length > 0 && (
          <ul className="divide-y divide-[#f3f0ff]">
            {recommendations.map((item, index) => (
              <li key={`${item.problemNumber}-${index}`}>
                <RecommendProblemRow item={item} index={index} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
