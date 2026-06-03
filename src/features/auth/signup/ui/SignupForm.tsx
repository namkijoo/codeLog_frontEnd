'use client';

import Link from 'next/link';
import { useState } from 'react';

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

const inputClassName =
  'w-full rounded-[9px] border-[1.5px] border-[#e5e3f5] bg-white px-[13px] py-[9px] text-[13.5px] text-title outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-brand focus:shadow-[0_0_0_3px_rgba(124,58,237,.12)] disabled:cursor-not-allowed disabled:opacity-60';

const signupButtonClassName =
  'flex w-full cursor-pointer items-center justify-center gap-[7px] rounded-[9px] border-0 bg-[linear-gradient(135deg,#a78bfa,#8b5cf6)] py-3 text-[15px] font-semibold leading-normal text-white shadow-[0_2px_10px_rgba(139,92,246,0.35)] transition-all duration-150 hover:-translate-y-px hover:bg-[linear-gradient(135deg,#8b5cf6,#7c3aed)] hover:shadow-[0_4px_18px_rgba(124,58,237,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';

const outlineButtonClassName =
  'flex cursor-pointer items-center justify-center gap-[7px] rounded-[9px] border-[1.5px] border-[#e5e3f5] bg-white px-4 py-2 text-[13.5px] font-semibold text-body transition-all duration-150 hover:border-[#c4b5fd] hover:bg-[#faf8ff] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60';

const verifyButtonClassName =
  'absolute top-1/2 right-1.5 -translate-y-1/2 cursor-pointer rounded-[6px] border-[1.5px] border-[#e5e3f5] bg-[#faf8ff] px-2.5 py-1 text-[11.5px] font-bold text-brand transition-colors hover:border-[#c4b5fd] disabled:cursor-not-allowed disabled:opacity-60';

function isValidPassword(password: string): boolean {
  return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
}

export function SignupForm() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyEmail = () => {
    if (!email.trim()) {
      alert('이메일을 입력해 주세요.');
      return;
    }
    alert('이메일 인증 기능은 준비 중입니다.');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidPassword(password)) {
      alert('비밀번호는 8자 이상이며, 대문자와 숫자를 포함해야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!agreedToTerms) {
      alert('이용약관 및 개인정보처리방침에 동의해 주세요.');
      return;
    }

    setIsLoading(true);
    alert('회원가입 API 연동은 준비 중입니다.');
    setIsLoading(false);
  };

  return (
    <section className="flex flex-1 items-center justify-center overflow-y-auto bg-[#f9f8ff] px-14 py-10">
      <div className="w-full max-w-[348px]">
        <Link
          href="/login"
          className="text-muted mb-5 inline-block text-xs font-semibold no-underline transition-colors hover:text-brand"
        >
          ← 로그인으로 돌아가기
        </Link>

        <h1 className="text-title mb-1.5 text-[26px] font-extrabold tracking-tight">회원가입</h1>
        <p className="text-muted text-body-s mb-7">30초면 충분해요. 함께 성장해요 ✨</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3.5">
            <label
              htmlFor="nickname"
              className="text-secondary mb-1.5 block text-[11.5px] font-bold tracking-wide"
            >
              이름 / 닉네임
            </label>
            <input
              id="nickname"
              className={inputClassName}
              type="text"
              placeholder="김지현"
              autoComplete="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-3.5">
            <label
              htmlFor="email"
              className="text-secondary mb-1.5 block text-[11.5px] font-bold tracking-wide"
            >
              이메일 주소
            </label>
            <div className="relative">
              <input
                id="email"
                className={`${inputClassName} pr-[62px]`}
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={handleVerifyEmail}
                className={verifyButtonClassName}
                disabled={isLoading}
              >
                인증
              </button>
            </div>
          </div>

          <div className="mb-3.5">
            <label
              htmlFor="signup-password"
              className="text-secondary mb-1.5 block text-[11.5px] font-bold"
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                id="signup-password"
                className={`${inputClassName} pr-[42px]`}
                type={showPassword ? 'text' : 'password'}
                placeholder="8자 이상, 대문자/숫자 포함"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer border-none bg-transparent text-[17px] leading-none text-muted"
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                disabled={isLoading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="text-secondary mb-1.5 block text-[11.5px] font-bold"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                className={`${inputClassName} pr-[42px]`}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호 재입력"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer border-none bg-transparent text-[17px] leading-none text-muted"
                aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                disabled={isLoading}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <label className="text-secondary mb-5 flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-[15px] w-[15px] shrink-0 cursor-pointer accent-brand"
              disabled={isLoading}
              required
            />
            <span className="text-body-s leading-snug">
              <a href="#" className="text-brand font-semibold underline underline-offset-2">
                이용약관
              </a>{' '}
              및{' '}
              <a href="#" className="text-brand font-semibold underline underline-offset-2">
                개인정보처리방침
              </a>
              에 동의합니다
            </span>
          </label>

          <button type="submit" disabled={isLoading} className={signupButtonClassName}>
            {isLoading ? '가입 중...' : '✨ 가입하고 시작하기'}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-[#9ca3af]">
          <span className="h-px flex-1 bg-[#e5e3f5]" />
          또는 간편 가입
          <span className="h-px flex-1 bg-[#e5e3f5]" />
        </div>

        <div className="flex gap-2.5">
          <button type="button" className={`${outlineButtonClassName} flex-1`} disabled={isLoading}>
            <GitHubIcon />
            GitHub
          </button>
          <button type="button" className={`${outlineButtonClassName} flex-1`} disabled={isLoading}>
            <GoogleIcon />
            Google
          </button>
        </div>
      </div>
    </section>
  );
}
