import { Logo } from '@/shared/ui/logo';

const FEATURES = [
  {
    icon: '📊',
    title: '실력 레이더 분석',
    description: '6개 영역 알고리즘 역량 시각화',
  },
  {
    icon: '🤖',
    title: 'AI 맞춤 문제 추천',
    description: '취약점 기반 학습 로드맵',
  },
  {
    icon: '🔥',
    title: '성장 스트릭 기록',
    description: '매일의 학습을 기록하고 추적',
  },
] as const;

export function SignupHero() {
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
          지금 시작하고
          <br />
          AI 코칭을 받아보세요 🚀
        </h2>
        <p className="mb-10 text-sm leading-[1.8] text-white/72">
          가입 즉시 나만의 알고리즘
          <br />
          실력 분석이 시작됩니다
        </p>
        <ul className="flex flex-col gap-3">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="flex items-start gap-3.5 rounded-xl border border-white/15 bg-white/12 px-4 py-3.5 backdrop-blur-sm"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-lg"
                aria-hidden
              >
                {feature.icon}
              </span>
              <div>
                <div className="text-[13.5px] font-bold text-white">{feature.title}</div>
                <div className="mt-0.5 text-xs leading-snug text-white/62">{feature.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-[1] text-[11px] text-white/30">© 2024 CodeLog.ai</p>
    </section>
  );
}
