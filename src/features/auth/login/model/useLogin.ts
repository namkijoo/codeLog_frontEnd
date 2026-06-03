'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '../api/login';
import { saveAuthTokens } from '../lib/token';

export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async (username: string, password: string, remember: boolean) => {
    setIsLoading(true);

    try {
      const response = await login({ username, password });
      saveAuthTokens(response, remember);
      router.push('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      alert('로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { submitLogin, isLoading };
}
