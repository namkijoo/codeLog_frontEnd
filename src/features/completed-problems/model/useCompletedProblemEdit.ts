'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type Difficulty,
  type LanguageId,
  type Platform,
} from '@/features/problem-record/model/constants';
import { updateBoard } from '../api/boards';
import { buildBoardRequest } from '../lib/buildBoardRequest';
import { resolveLanguageId } from '../lib/resolveLanguageId';
import type { BoardResponse } from './types';

function createFormState(board: BoardResponse) {
  return {
    platform: board.platformName as Platform,
    problemNumber: String(board.problemNumber),
    difficulty: board.difficulty as Difficulty,
    title: board.title,
    problemUrl: board.problemUrl,
    tags: [...board.tags],
    tagInput: '',
    memo: board.memo,
    language: resolveLanguageId(board.language),
    code: board.code,
  };
}

export function useCompletedProblemEdit(
  board: BoardResponse | null,
  onUpdated: (board: BoardResponse) => void,
) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [platform, setPlatform] = useState<Platform>('프로그래머스');
  const [problemNumber, setProblemNumber] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Lv. 0');
  const [title, setTitle] = useState('');
  const [problemUrl, setProblemUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [memo, setMemo] = useState('');
  const [language, setLanguage] = useState<LanguageId>('javascript');
  const [code, setCode] = useState('');

  const resetFromBoard = useCallback((source: BoardResponse) => {
    const form = createFormState(source);
    setPlatform(form.platform);
    setProblemNumber(form.problemNumber);
    setDifficulty(form.difficulty);
    setTitle(form.title);
    setProblemUrl(form.problemUrl);
    setTags(form.tags);
    setTagInput('');
    setMemo(form.memo);
    setLanguage(form.language);
    setCode(form.code);
  }, []);

  useEffect(() => {
    if (board && !isEditing) {
      resetFromBoard(board);
    }
  }, [board, resetFromBoard, isEditing]);

  const codeStats = useMemo(() => {
    const lines = code.split('\n').length;
    const chars = code.length;
    return { lines, chars };
  }, [code]);

  const addTag = useCallback(() => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput('');
  }, [tagInput, tags]);

  const removeTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((item) => item !== tag));
  }, []);

  const handleTagKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addTag();
      }
    },
    [addTag],
  );

  const startEdit = useCallback(() => {
    if (!board) return;
    resetFromBoard(board);
    setIsEditing(true);
  }, [board, resetFromBoard]);

  const cancelEdit = useCallback(() => {
    if (board) {
      resetFromBoard(board);
    }
    setIsEditing(false);
  }, [board, resetFromBoard]);

  const saveEdit = useCallback(async () => {
    if (!board) return;

    const request = buildBoardRequest({
      platform,
      problemNumber,
      difficulty,
      title,
      problemUrl,
      tags,
      memo,
      language,
      code,
    });

    if (!request) {
      window.alert('문제번호, 제목, 풀이 코드를 확인해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const updated = await updateBoard(board.id, request);
      onUpdated(updated);
      resetFromBoard(updated);
      setIsEditing(false);
      window.alert('수정이 완료되었습니다.');
    } catch (err) {
      const message = err instanceof Error ? err.message : '수정에 실패했습니다.';
      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    board,
    platform,
    problemNumber,
    difficulty,
    title,
    problemUrl,
    tags,
    memo,
    language,
    code,
    onUpdated,
    resetFromBoard,
  ]);

  return {
    isEditing,
    isSubmitting,
    platform,
    setPlatform,
    problemNumber,
    setProblemNumber,
    difficulty,
    setDifficulty,
    title,
    setTitle,
    problemUrl,
    setProblemUrl,
    tags,
    tagInput,
    setTagInput,
    addTag,
    removeTag,
    handleTagKeyDown,
    memo,
    setMemo,
    language,
    setLanguage,
    code,
    setCode,
    codeStats,
    startEdit,
    cancelEdit,
    saveEdit,
  };
}
