type SpinnerProps = {
  className?: string;
  label?: string;
};

export function Spinner({ className = '', label = '로딩 중' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-block size-6 animate-spin rounded-full border-[2.5px] border-[#ddd6fe] border-t-[#7c3aed] ${className}`}
    />
  );
}
