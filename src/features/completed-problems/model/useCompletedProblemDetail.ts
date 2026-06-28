'use client';

import { useCallback, useEffect, useState } from 'react';
import { getMyBoards } from '../api/boards';
import type { BoardResponse } from './types';

export function useCompletedProblemDetail(boardId: number | null) {
  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoard = useCallback(async () => {
    if (boardId === null) {
      setBoard(null);
      setError('유효하지 않은 문제입니다.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const boards = await getMyBoards();
      const found = boards.find((item) => item.id === boardId);
      if (!found) {
        setBoard(null);
        setError('문제를 찾을 수 없습니다.');
        return;
      }
      setBoard(found);
    } catch (err) {
      const message = err instanceof Error ? err.message : '문제를 불러오지 못했습니다.';
      setError(message);
      setBoard(null);
    } finally {
      setIsLoading(false);
    }
  }, [boardId]);

  useEffect(() => {
    void fetchBoard();
  }, [fetchBoard]);

  return { board, isLoading, error };
}
