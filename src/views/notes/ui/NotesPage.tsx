import { AppShell } from '@/widgets/app-shell';
import { NotesFeature } from '@/features/notes';

export function NotesPage() {
  return (
    <AppShell>
      <NotesFeature />
    </AppShell>
  );
}
