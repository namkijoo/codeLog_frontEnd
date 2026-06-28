import { LANGUAGES, type LanguageId } from '@/features/problem-record/model/constants';

export function resolveLanguageId(language: string): LanguageId {
  const normalized = language.trim().toLowerCase();
  const found = LANGUAGES.find(
    (item) =>
      item.id === normalized ||
      item.label.toLowerCase() === normalized ||
      item.label.toLowerCase().replace('+', 'p') === normalized.replace('+', 'p'),
  );
  return found?.id ?? 'javascript';
}
