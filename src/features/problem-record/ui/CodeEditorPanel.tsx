'use client';

import dynamic from 'next/dynamic';
import { LANGUAGES } from '../model/constants';
import type { useProblemRecord } from '../model/useProblemRecord';
import { cardClassName } from './styles';

const CodeMirrorEditor = dynamic(
  () => import('./CodeMirrorEditor').then((mod) => mod.CodeMirrorEditor),
  {
    ssr: false,
    loading: () => (
      <div className="text-muted flex h-full min-h-[200px] items-center justify-center bg-[#fafafa] text-[13px]">
        에디터 로딩 중...
      </div>
    ),
  },
);

type CodeEditorPanelProps = Pick<
  ReturnType<typeof useProblemRecord>,
  'language' | 'setLanguage' | 'code' | 'setCode' | 'codeStats'
> & {
  readOnly?: boolean;
};

export function CodeEditorPanel({
  language,
  setLanguage,
  code,
  setCode,
  codeStats,
  readOnly = false,
}: CodeEditorPanelProps) {
  return (
    <section className={`${cardClassName} flex h-full flex-col`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-title text-[14px] font-bold">풀이 코드</h2>
        <span className="text-muted text-[12px] font-medium">
          {codeStats.lines}줄 · {codeStats.chars.toLocaleString()}자
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {LANGUAGES.map((item) => {
          const isSelected = language === item.id;
          if (readOnly && !isSelected) return null;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setLanguage(item.id)}
              disabled={readOnly}
              className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition-colors ${
                readOnly ? 'cursor-default' : 'cursor-pointer'
              } ${
                isSelected
                  ? 'border-brand bg-[#f3f0ff] text-brand'
                  : 'border-[#e5e3f5] bg-white text-secondary hover:border-[#c4b5fd] hover:bg-[#faf8ff]'
              }`}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mb-4 flex min-h-[200px] flex-1 flex-col overflow-hidden rounded-lg border border-[#e5e3f5]">
        <CodeMirrorEditor
          key={readOnly ? 'readonly' : 'editable'}
          value={code}
          language={language}
          onChange={setCode}
          readOnly={readOnly}
        />
      </div>
    </section>
  );
}
