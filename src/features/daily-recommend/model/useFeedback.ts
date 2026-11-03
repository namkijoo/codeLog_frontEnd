'use client';

import { useCallback, useEffect, useState } from 'react';
import { getFeedback } from '../api/feedback';
import { readFeedbackCache, writeFeedbackCache } from '../lib/cache';
import type { FeedbackResponse } from './types';

export function useFeedback() {
  const [data, setData] = useState<FeedbackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    const cached = readFeedbackCache();
    if (!cached) return;
    setData(cached);
    setHasRequested(true);
  }, []);

  const fetchFeedback = useCallback(async () => {
    setHasRequested(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getFeedback();
      setData(response);
      writeFeedbackCache(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : '피드백을 불러오지 못했습니다.';
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
    fetchFeedback,
  };
}
