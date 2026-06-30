import { LANGUAGES, type Difficulty, type LanguageId, type Platform } from '@/features/problem-record/model/constants';
import type { BoardRequest } from '../model/types';

export function buildBoardRequest(state: {
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
