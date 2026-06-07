'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_CODE,
  DEFAULT_MEMO,
  type Difficulty,
  type LanguageId,
  type Platform,
} from './constants';

export function useProblemRecord() {
  const [platform, setPlatform] = useState<Platform>('백준');
  const [problemNumber, setProblemNumber] = useState('14502');
  const [difficulty, setDifficulty] = useState<Difficulty>('Bronze');
  const [title, setTitle] = useState('연구소');
  const [problemUrl, setProblemUrl] = useState('https://www.acmicpc.net/problem/14502');
  const [tags, setTags] = useState<string[]>(['DFS/BFS', '구현', '백트래킹']);
  const [tagInput, setTagInput] = useState('');
  const [memo, setMemo] = useState(DEFAULT_MEMO);
  const [language, setLanguage] = useState<LanguageId>('python');
  const [code, setCode] = useState(DEFAULT_CODE);
  const [githubUrl, setGithubUrl] = useState('');

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

  const saveDraft = useCallback(() => {
    window.alert('임시 저장되었습니다.');
  }, []);

  const submitRecord = useCallback(() => {
    window.alert('풀이가 기록되었습니다! 🚀');
  }, []);

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
    saveDraft,
    submitRecord,
  };
}
