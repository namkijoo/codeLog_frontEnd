import { AppShell } from '@/widgets/app-shell';
import { ProblemRecordFeature } from '@/features/problem-record';

export function ProblemRecordPage() {
  return (
    <AppShell>
      <div className="flex min-h-0 flex-1 flex-col bg-[#f9f8ff]">
        <ProblemRecordFeature />
      </div>
    </AppShell>
  );
}
