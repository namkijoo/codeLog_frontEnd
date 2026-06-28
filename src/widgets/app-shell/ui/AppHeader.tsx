'use client';

import { useRouter } from 'next/navigation';
import { Logo } from '@/shared/ui/logo';
import { clearAuthTokens } from '@/shared/auth';

export function AppHeader() {
  const router = useRouter();

  const handleLogout = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) return;

    clearAuthTokens();
    router.push('/login');
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#e5e3f5] bg-white px-6">
      <Logo />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleLogout}
          className="text-muted cursor-pointer border-none bg-transparent p-0 text-[13px] font-medium transition-colors hover:text-secondary"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}
