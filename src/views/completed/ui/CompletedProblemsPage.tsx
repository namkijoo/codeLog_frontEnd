import { AppShell } from '@/widgets/app-shell';
import { CompletedProblemsFeature } from '@/features/completed-problems';

export function CompletedProblemsPage() {
  return (
    <AppShell>
      <CompletedProblemsFeature />
    </AppShell>
  );
}
