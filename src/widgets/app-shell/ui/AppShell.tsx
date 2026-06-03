import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader />
      <div className="flex min-h-0 flex-1">
        <AppSidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
