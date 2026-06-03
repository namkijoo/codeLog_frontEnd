import { Logo } from '@/shared/ui/logo';

const STATS = [
  { value: '3,422+', label: '풀린 문제' },
  { value: '342명', label: '활성 사용자' },
  { value: '14일', label: '평균 스트릭' },
  { value: '98%', label: 'AI 정확도' },
] as const;

export function LoginHero() {
  return (
    <section
      className="relative flex w-[44%] shrink-0 flex-col overflow-hidden p-[52px]"
      style={{
        background: 'linear-gradient(145deg,#4c1d95 0%,#6d28d9 50%,#7c3aed 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle,white 1.5px,transparent 1.5px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div
        className="pointer-events-none absolute -top-[60px] -right-[60px] h-[280px] w-[280px] rounded-full"
        style={{
          background: 'radial-gradient(circle,rgba(196,181,253,.35),transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-[80px] -left-10 h-[220px] w-[220px] rounded-full"
        style={{
          background: 'radial-gradient(circle,rgba(139,92,246,.2),transparent 70%)',
        }}
      />

      <Logo light />

      <div className="relative z-[1] flex flex-1 flex-col justify-center">
        <h2 className="mb-4 text-[32px] leading-[1.25] font-extrabold tracking-tight text-white">
          코드로 성장하는
          <br />
          당신의 여정을
          <br />
          기록하세요 ✨
        </h2>
        <p className="mb-11 text-sm leading-[1.8] text-white/72">
          AI가 분석하는 나만의
          <br />
          알고리즘 학습 코칭 플랫폼
        </p>
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/15 bg-white/12 px-[18px] py-3.5 backdrop-blur-sm"
            >
              <div className="text-[22px] font-extrabold text-white">{stat.value}</div>
              <div className="mt-0.5 text-xs text-white/62">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="relative z-[1] text-[11px] text-white/30">© 2024 CodeLog.ai</p>
    </section>
  );
}
