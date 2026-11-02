'use client';

import { useCallback, useEffect, useState } from 'react';
import { getActivityStats } from '../api/activity';
import type { ActivityResponse } from './types';

export function useActivityStats() {
  const [data, setData] = useState<ActivityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getActivityStats();
      setData(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : '활동 통계를 불러오지 못했습니다.';
      setError(message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchActivity();
  }, [fetchActivity]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchActivity,
  };
}
