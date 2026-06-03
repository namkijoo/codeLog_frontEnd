'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3v6h6M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RobotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="5" y="8" width="14" height="11" rx="2" />
      <path d="M12 8V5M8 5h8M9 14h.01M15 14h.01M10 18h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: '홈', icon: <HomeIcon /> },
  { href: '/completed', label: '완료된 문제', icon: <DocumentIcon /> },
  { href: '/ai-analysis', label: 'AI 분석', icon: <RobotIcon /> },
  { href: '/problems', label: '문제 기록', icon: <PencilIcon /> },
];

const CONTRIBUTION_LEVELS = [0.2, 0.45, 0.7, 0.35, 0.55] as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-[#e5e3f5] bg-white px-4 py-5">
      <p className="text-muted mb-3 px-2 text-[10px] font-bold tracking-[0.12em] uppercase">Menu</p>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] font-semibold no-underline transition-colors ${
                isActive
                  ? 'bg-[#f3f0ff] text-brand'
                  : 'text-secondary hover:bg-[#faf8ff] hover:text-body'
              }`}
            >
              <span className={isActive ? 'text-brand' : 'text-muted'}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2 pt-6">
        <p className="text-muted mb-2.5 text-[11px] font-semibold">오늘의 기여</p>
        <div className="flex gap-1.5" aria-hidden>
          {CONTRIBUTION_LEVELS.map((opacity, index) => (
            <span
              key={index}
              className="h-7 flex-1 rounded-[4px]"
              style={{ background: `rgba(124, 58, 237, ${opacity})` }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
