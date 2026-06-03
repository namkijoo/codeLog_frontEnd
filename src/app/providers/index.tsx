'use client';

import { AuthGuard } from '@/shared/auth';

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
