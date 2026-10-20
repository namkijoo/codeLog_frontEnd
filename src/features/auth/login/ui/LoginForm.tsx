'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLogin } from '../model/useLogin';

const inputClassName =
  'w-full rounded-[9px] border-[1.5px] border-[#e5e3f5] bg-white px-[13px] py-[9px] text-[13.5px] text-title outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-brand focus:shadow-[0_0_0_3px_rgba(124,58,237,.12)] disabled:cursor-not-allowed disabled:opacity-60';

const loginButtonClassName =
  'flex w-full cursor-pointer mt-8 items-center justify-center gap-[7px] rounded-[9px] border-0 bg-[linear-gradient(135deg,#7c3aed,#6d28d9)] py-3 text-[15px] font-semibold leading-normal text-white shadow-[0_2px_10px_rgba(109,40,217,0.3)] transition-all duration-150 hover:-translate-y-px hover:bg-[linear-gradient(135deg,#6d28d9,#5b21b6)] hover:shadow-[0_4px_18px_rgba(109,40,217,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';

export function LoginForm() {
  const { submitLogin, isLoading } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitLogin(username.trim(), password, remember);
  };

  return (
    <section className="flex flex-1 items-center justify-center overflow-y-auto bg-[#f9f8ff] px-14 py-12">
      <div className="w-full max-w-[348px]">
        <h1 className="text-title mb-1.5 text-[26px] font-extrabold tracking-tight">로그인</h1>
        <p className="text-muted text-body-s mb-[30px]">CodeLog.ai에 오신 것을 환영합니다 👋</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="text-secondary mb-1.5 block text-[11.5px] font-bold tracking-wide"
            >
              아이디
            </label>
            <input
              id="username"
              className={inputClassName}
              type="text"
              placeholder="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-1.5">
            <label
              htmlFor="password"
              className="text-secondary mb-1.5 block text-[11.5px] font-bold"
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                className={`${inputClassName} pr-[42px]`}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
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

          <div className="mb-[18px] flex items-center justify-between">
            <label className="text-secondary  flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-[15px] w-[15px] cursor-pointer accent-brand"
                disabled={isLoading}
              />
              <span className="text-body-m">로그인 유지</span>
            </label>
            <a href="#" className="text-brand text-xs font-semibold no-underline">
              아이디 / 비밀번호 찾기
            </a>
          </div>

          <button type="submit" disabled={isLoading} className={loginButtonClassName}>
            {isLoading ? '로그인 중...' : '🚀 로그인하기'}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-[#9ca3af]">
          <span className="h-px flex-1 bg-[#e5e3f5]" />
          또는 다음으로 로그인
          <span className="h-px flex-1 bg-[#e5e3f5]" />
        </div>

        <p className="text-secondary mt-6 text-center text-[13px]">
          아직 계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="text-brand font-semibold no-underline transition-opacity hover:opacity-80"
          >
            회원가입 →
          </Link>
        </p>
      </div>
    </section>
  );
}
