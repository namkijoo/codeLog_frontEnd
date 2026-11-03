import { apiClient } from '@/shared/api';
import type { FeedbackResponse } from '../model/types';

export function getFeedback() {
  return apiClient<FeedbackResponse>('/api/recommend/feedback', {
    method: 'GET',
  });
}
