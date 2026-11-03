'use client';

import { useCallback, useState } from 'react';
import { getFeedback } from '../api/feedback';
import type { FeedbackResponse } from './types';

export function useFeedback() {
  const [data, setData] = useState<FeedbackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRequested, setHasRequested] = useState(false);

  const fetchFeedback = useCallback(async () => {
    setHasRequested(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getFeedback();
      setData(response);
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
