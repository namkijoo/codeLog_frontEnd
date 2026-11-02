import { ActivityStatsFeature } from '@/features/activity-stats';
import { DailyRecommendFeature } from '@/features/daily-recommend';
import { AppShell } from '@/widgets/app-shell';

export function HomePage() {
  return (
    <AppShell>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f9f8ff] px-8 py-6">
        <div className="mb-6">
          <h1 className="text-title text-[22px] font-extrabold tracking-tight">홈</h1>
          <p className="text-muted mt-1 text-[13px] font-medium">오늘의 학습 가이드</p>
        </div>

        <DailyRecommendFeature embedded />

        <div className="mt-5">
          <ActivityStatsFeature />
        </div>
      </div>
    </AppShell>
  );
}
