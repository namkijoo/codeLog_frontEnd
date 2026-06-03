'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useSyncExternalStore } from 'react';
import { isPublicPath } from './paths';
import { clearAuthTokens, getAccessToken, syncAuthCookie } from './token';

type AuthGuardProps = {
  children: React.ReactNode;
};

function subscribe() {
  return () => {};
}

function AuthLoading() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <p className="text-body-m text-muted">로딩 중...</p>
    </div>
  );
}

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const publicPath = isPublicPath(pathname);
  const token = mounted ? getAccessToken() : null;

  useEffect(() => {
    if (!mounted) return;

    if (token) {
      syncAuthCookie();
      return;
    }

    if (publicPath) return;

    clearAuthTokens();
    router.replace(`/login?from=${encodeURIComponent(pathname)}`);
  }, [mounted, pathname, publicPath, token, router]);

  if (publicPath) {
    const isAuthEntryPath = pathname.startsWith('/login') || pathname.startsWith('/signup');
    if (mounted && token && isAuthEntryPath) {
      return <AuthLoading />;
    }
    return children;
  }

  if (!mounted || !token) {
    return <AuthLoading />;
  }

  return children;
}
