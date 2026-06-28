'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMyBoards } from '../api/boards';
import type { BoardResponse, SortKey } from './types';

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function compareBoards(a: BoardResponse, b: BoardResponse, sortKey: SortKey): number {
  switch (sortKey) {
    case 'date':
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    case 'difficulty':
      return a.difficulty.localeCompare(b.difficulty, 'ko');
    case 'platform':
      return a.platformName.localeCompare(b.platformName, 'ko');
    case 'tags':
      return b.tags.length - a.tags.length;
    default:
      return 0;
  }
}

export function useCompletedProblems() {
  const [boards, setBoards] = useState<BoardResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');

  const fetchBoards = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getMyBoards();
      setBoards(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : '목록을 불러오지 못했습니다.';
      setError(message);
      setBoards([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBoards();
  }, [fetchBoards]);

  const filteredBoards = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = query
      ? boards.filter((board) => {
          const haystack = [
            board.title,
            board.platformName,
            board.difficulty,
            board.memo,
            ...board.tags,
          ]
            .join(' ')
            .toLowerCase();
          return haystack.includes(query);
        })
      : boards;

    return [...filtered].sort((a, b) => compareBoards(a, b, sortKey));
  }, [boards, search, sortKey]);

  return {
    boards: filteredBoards,
    totalCount: boards.length,
    isLoading,
    error,
    search,
    setSearch,
    sortKey,
    setSortKey,
    formatDate,
    refetch: fetchBoards,
  };
}
