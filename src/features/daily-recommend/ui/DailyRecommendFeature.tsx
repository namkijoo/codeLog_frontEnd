'use client';

import { useDailyRecommend } from '../model/useDailyRecommend';
import { useFeedback } from '../model/useFeedback';
import { RecommendFeedbackPanel } from './RecommendFeedbackPanel';
import { RecommendProblemsPanel } from './RecommendProblemsPanel';

type DailyRecommendFeatureProps = {
  /** 홈 페이지에서 상위 레이아웃을 쓸 때 내부 패딩/헤더를 생략합니다. */
  embedded?: boolean;
};

export function DailyRecommendFeature({ embedded = false }: DailyRecommendFeatureProps) {
  const recommend = useDailyRecommend();
  const feedback = useFeedback();

  const panels = (
    <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-2">
      <RecommendProblemsPanel
        recommendations={recommend.data?.recommendations ?? []}
        date={recommend.data?.date}
        isLoading={recommend.isLoading}
        error={recommend.error}
        hasRequested={recommend.hasRequested}
        onRequest={() => void recommend.fetchRecommend()}
      />
      <RecommendFeedbackPanel
        feedback={feedback.data}
        isLoading={feedback.isLoading}
        error={feedback.error}
        hasRequested={feedback.hasRequested}
        onRequest={() => void feedback.fetchFeedback()}
      />
    </div>
  );

  if (embedded) {
    return panels;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f9f8ff] px-8 py-6">
      <div className="mb-6">
        <h1 className="text-title text-[22px] font-extrabold tracking-tight">홈</h1>
        <p className="text-muted mt-1 text-[13px] font-medium">오늘의 학습 가이드</p>
      </div>
      {panels}
    </div>
  );
}
