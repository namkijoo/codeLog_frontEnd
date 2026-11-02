'use client';

import { useActivityStats } from '../model/useActivityStats';
import { ActivityHeatmap, ActivityHeatmapLegend } from './ActivityHeatmap';

export function ActivityStatsFeature() {
  const { data, isLoading, error, refetch } = useActivityStats();

  return (
    <section className="rounded-2xl border border-[#e5e3f5] bg-gradient-to-b from-[#faf8ff] to-white px-5 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-extrabold tracking-tight text-[#7c3aed]">
          통합 분석 및 권장 학습
        </h2>
        <p className="flex items-center gap-1 text-[11.5px] font-semibold text-[#a78bfa]">
          <span aria-hidden>✨</span>
          AI Powering your Growth
        </p>
      </div>

      {isLoading && (
        <div className="text-muted flex h-[120px] items-center justify-center text-[13.5px]">
          활동 통계를 불러오는 중...
        </div>
      )}

      {!isLoading && error && (
        <div className="flex h-[120px] flex-col items-center justify-center gap-3 text-center">
          <p className="text-secondary text-[13.5px] font-medium">{error}</p>
          <button type="button" onClick={() => void refetch()} className="btn-outline w-auto">
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          <ActivityHeatmap days={data.days} />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-[#ddd6fe] bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-[#6d28d9]">
                총 성공 문제{' '}
                <strong className="ml-1 font-extrabold">{data.totalSolved}개</strong>
              </span>
              <span className="inline-flex items-center rounded-full border border-[#ddd6fe] bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-[#6d28d9]">
                현재 스트릭{' '}
                <strong className="ml-1 font-extrabold">{data.currentStreak}일</strong>
                <span className="ml-1" aria-hidden>
                  🔥
                </span>
              </span>
            </div>
            <ActivityHeatmapLegend />
          </div>
        </>
      )}
    </section>
  );
}
