import { apiClient } from '@/shared/api';
import type { DailyRecommendResponse } from '../model/types';

export function getDailyRecommend() {
  return apiClient<DailyRecommendResponse>('/api/recommend/daily', {
    method: 'GET',
  });
}
