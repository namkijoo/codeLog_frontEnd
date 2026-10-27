'use client';

import type { RecommendationItem } from '../model/types';

function getDifficultyClass(difficulty: string): string {
  const lower = difficulty.toLowerCase();
  if (
    lower.includes('gold') ||
    lower.includes('lv. 5') ||
    lower.includes('lv. 4') ||
    lower.includes('lv.5') ||
    lower.includes('lv.4')
  ) {
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }
  if (
    lower.includes('silver') ||
    lower.includes('lv. 3') ||
    lower.includes('lv. 2') ||
    lower.includes('lv.3') ||
    lower.includes('lv.2')
  ) {
    return 'bg-slate-100 text-slate-600 border-slate-200';
  }
  return 'bg-[#f3f0ff] text-brand border-[#e9e0ff]';
}

type RecommendProblemRowProps = {
  item: RecommendationItem;
  index: number;
};

export function RecommendProblemRow({ item, index }: RecommendProblemRowProps) {
  return (
    <a
      href={item.problemUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 px-5 py-4 no-underline transition-colors hover:bg-[#fcfbff]"
    >
      <span className="text-brand mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#f3f0ff] text-[12px] font-bold">
        {index + 1}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-title text-[14px] font-bold group-hover:text-brand">{item.title}</h3>
          <span
            className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-semibold ${getDifficultyClass(item.difficulty)}`}
          >
            {item.difficulty}
          </span>
        </div>
        <p className="text-secondary mt-0.5 text-[12px] font-medium">
          {item.platform} · #{item.problemNumber}
        </p>
        <p className="text-body mt-1.5 text-[13px] leading-relaxed">{item.reason}</p>
      </div>

      <span className="text-brand mt-0.5 shrink-0 text-[12px] font-semibold opacity-0 transition-opacity group-hover:opacity-100">
        →
      </span>
    </a>
  );
}
