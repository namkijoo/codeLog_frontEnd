export const PLATFORMS = ['프로그래머스'] as const;

export const DIFFICULTIES = ['Lv. 0', 'Lv. 1', 'Lv. 2', 'Lv. 3', 'Lv. 4', 'Lv. 5'] as const;

export const LANGUAGES = [
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'java', label: 'Java', icon: '☕' },
  { id: 'cpp', label: 'C++', icon: '⚡' },
  { id: 'javascript', label: 'JavaScript', icon: '🟨' },
  { id: 'go', label: 'Go', icon: '🔵' },
  { id: 'kotlin', label: 'Kotlin', icon: '🟣' },
] as const;

export type Platform = (typeof PLATFORMS)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
export type LanguageId = (typeof LANGUAGES)[number]['id'];
