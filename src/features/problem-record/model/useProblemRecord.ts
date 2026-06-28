'use client';

import { useCallback, useMemo, useState } from 'react';
import { createBoard } from '../api/boards';
import {
  DEFAULT_CODE,
  DEFAULT_MEMO,
  LANGUAGES,
  type Difficulty,
  type LanguageId,
  type Platform,
} from './constants';
import type { BoardRequest } from './types';

function buildBoardRequest(state: {
  platform: Platform;
  problemNumber: string;
  difficulty: Difficulty;
  title: string;
  problemUrl: string;
  tags: string[];
  memo: string;
  language: LanguageId;
  code: string;
}): BoardRequest | null {
  const parsedProblemNumber = Number.parseInt(state.problemNumber.trim(), 10);
  if (!Number.isFinite(parsedProblemNumber)) return null;
  if (!state.title.trim()) return null;
  if (!state.code.trim()) return null;

  const languageLabel =
    LANGUAGES.find((item) => item.id === state.language)?.label ?? state.language;

  return {
    problemNumber: parsedProblemNumber,
    problemUrl: state.problemUrl.trim(),
    platformName: state.platform,
    tags: state.tags,
    difficulty: state.difficulty,
    title: state.title.trim(),
    memo: state.memo,
    language: languageLabel,
    code: state.code,
  };
}

export function useProblemRecord() {
  const [platform, setPlatform] = useState<Platform>('프로그래머스');
  const [problemNumber, setProblemNumber] = useState('14502');
  const [difficulty, setDifficulty] = useState<Difficulty>('Lv. 0');
  const [title, setTitle] = useState('연구소');
  const [problemUrl, setProblemUrl] = useState('https://school.programmers.co.kr/learn/courses/30/lessons/14502');
  const [tags, setTags] = useState<string[]>(['DFS/BFS', '구현', '백트래킹']);
  const [tagInput, setTagInput] = useState('');
  const [memo, setMemo] = useState(DEFAULT_MEMO);
  const [language, setLanguage] = useState<LanguageId>('javascript');
  const [code, setCode] = useState(DEFAULT_CODE);
  const [githubUrl, setGithubUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setTags((prev) => prev.filter((t) => t !== tag));
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

  const submitRecord = useCallback(async () => {
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
      await createBoard(request);
      window.alert('풀이가 기록되었습니다! 🚀');
    } catch (err) {
      const message = err instanceof Error ? err.message : '풀이 기록에 실패했습니다.';
      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    platform,
    problemNumber,
    difficulty,
    title,
    problemUrl,
    tags,
    memo,
    language,
    code,
  ]);

  return {
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
    githubUrl,
    setGithubUrl,
    codeStats,
    isSubmitting,
    submitRecord,
  };
}
