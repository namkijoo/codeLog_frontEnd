import { DailyRecommendFeature } from '@/features/daily-recommend';
import { AppShell } from '@/widgets/app-shell';

export function HomePage() {
  return (
    <AppShell>
      <DailyRecommendFeature />
    </AppShell>
  );
}
