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
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' }}
            aria-hidden
          >
            김
          </span>
          <span className="text-body text-[13.5px] font-semibold">김지현</span>
        </div>

        <span className="h-4 w-px bg-[#e5e3f5]" aria-hidden />

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
