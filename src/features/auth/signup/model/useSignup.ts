'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signup } from '../api/signup';

export function useSignup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const submitSignup = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      await signup({ username, password });
      alert('회원가입이 완료되었습니다. 로그인해 주세요.');
      router.push('/login');
    } catch (err) {
      const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitSignup, isLoading };
}
