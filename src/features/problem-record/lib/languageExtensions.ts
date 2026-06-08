import { cpp } from '@codemirror/lang-cpp';
import { go } from '@codemirror/lang-go';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import type { Extension } from '@codemirror/state';
import type { LanguageId } from '../model/constants';

export function getLanguageExtension(language: LanguageId): Extension[] {
  switch (language) {
    case 'python':
      return [python()];
    case 'java':
      return [java()];
    case 'cpp':
      return [cpp()];
    case 'javascript':
      return [javascript()];
    case 'go':
      return [go()];
    case 'kotlin':
      return [];
    default:
      return [];
  }
}
