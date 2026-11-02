import { apiClient } from '@/shared/api';
import type { ActivityResponse } from '../model/types';

export function getActivityStats() {
  return apiClient<ActivityResponse>('/api/stats/activity', {
    method: 'GET',
  });
}
