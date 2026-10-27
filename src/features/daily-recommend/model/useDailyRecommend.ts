'use client';

import { useCallback, useState } from 'react';
import { getDailyRecommend } from '../api/recommend';
import type { DailyRecommendResponse } from './types';

export function useDailyRecommend() {
  const [data, setData] = useState<DailyRecommendResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRequested, setHasRequested] = useState(false);

  const fetchRecommend = useCallback(async () => {
    setHasRequested(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getDailyRecommend();
      setData(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : '추천을 불러오지 못했습니다.';
      setError(message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    hasRequested,
    fetchRecommend,
  };
}
