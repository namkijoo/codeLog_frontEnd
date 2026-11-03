import type { DailyRecommendResponse, FeedbackResponse } from '../model/types';

const RECOMMEND_CACHE_KEY = 'codelog:daily-recommend';
const FEEDBACK_CACHE_KEY = 'codelog:daily-feedback';

type CacheEntry<T> = {
  date: string;
  data: T;
};

function todayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (!parsed?.date || parsed.data === undefined) {
      localStorage.removeItem(key);
      return null;
    }

    if (parsed.date !== todayDate()) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;

  const entry: CacheEntry<T> = {
    date: todayDate(),
    data,
  };

  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Quota or private mode — ignore persistence failure.
  }
}

export function readRecommendCache(): DailyRecommendResponse | null {
  return readCache<DailyRecommendResponse>(RECOMMEND_CACHE_KEY);
}

export function writeRecommendCache(data: DailyRecommendResponse): void {
  writeCache(RECOMMEND_CACHE_KEY, data);
}

export function readFeedbackCache(): FeedbackResponse | null {
  return readCache<FeedbackResponse>(FEEDBACK_CACHE_KEY);
}

export function writeFeedbackCache(data: FeedbackResponse): void {
  writeCache(FEEDBACK_CACHE_KEY, data);
}

export function clearDailyRecommendCaches(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(RECOMMEND_CACHE_KEY);
  localStorage.removeItem(FEEDBACK_CACHE_KEY);
}
