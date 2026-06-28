import { AppShell } from '@/widgets/app-shell';
import { CompletedProblemDetailFeature } from '@/features/completed-problems/ui/CompletedProblemDetailFeature';

export function CompletedProblemDetailPage() {
  return (
    <AppShell>
      <div className="flex min-h-0 flex-1 flex-col bg-[#f9f8ff]">
        <CompletedProblemDetailFeature />
      </div>
    </AppShell>
  );
}
