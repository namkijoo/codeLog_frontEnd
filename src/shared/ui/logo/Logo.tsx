type LogoProps = {
  light?: boolean;
  sm?: boolean;
};

export function Logo({ light = false, sm = false }: LogoProps) {
  const size = sm ? 26 : 32;
  const fontSize = sm ? 14 : 16;
  const iconFontSize = sm ? 11 : 13;

  return (
    <div className="flex shrink-0 items-center gap-2">
      <div
        className="flex shrink-0 items-center justify-center rounded-lg font-mono font-bold text-white"
        style={{
          width: size,
          height: size,
          fontSize: iconFontSize,
          background: light
            ? 'rgba(255,255,255,.18)'
            : 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
          border: light ? '1.5px solid rgba(255,255,255,.28)' : 'none',
        }}
      >
        {'</>'}
      </div>
      <span
        className="font-bold tracking-tight"
        style={{
          fontSize,
          color: light ? 'white' : 'var(--text-color-title)',
        }}
      >
        CodeLog
        <span style={{ color: light ? 'rgba(255,255,255,.65)' : 'var(--text-color-brand)' }}>
          .ai
        </span>
      </span>
    </div>
  );
}
