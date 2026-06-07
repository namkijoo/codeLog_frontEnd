'use client';

import { useEffect, useRef } from 'react';
import { LANGUAGES } from '../model/constants';
import type { useProblemRecord } from '../model/useProblemRecord';
import { cardClassName, inputClassName, labelClassName } from './styles';

type CodeEditorPanelProps = Pick<
  ReturnType<typeof useProblemRecord>,
  'language' | 'setLanguage' | 'code' | 'setCode' | 'githubUrl' | 'setGithubUrl' | 'codeStats'
>;

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function CodeEditorPanel({
  language,
  setLanguage,
  code,
  setCode,
  githubUrl,
  setGithubUrl,
  codeStats,
}: CodeEditorPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const lineCount = code.split('\n').length;

  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;
    if (!textarea || !lineNumbers) return;

    const syncScroll = () => {
      lineNumbers.scrollTop = textarea.scrollTop;
    };

    textarea.addEventListener('scroll', syncScroll);
    return () => textarea.removeEventListener('scroll', syncScroll);
  }, []);

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
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setLanguage(item.id)}
              className={`flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition-colors ${
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

      <div className="mb-4 flex min-h-[320px] flex-1 overflow-hidden rounded-lg border border-[#e5e3f5] bg-[#fafafa]">
        <div
          ref={lineNumbersRef}
          className="text-muted shrink-0 overflow-hidden border-r border-[#e5e3f5] bg-[#f5f5f7] px-3 py-3 text-right font-mono text-[12.5px] leading-[1.6] select-none"
          aria-hidden
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="text-body min-h-[320px] w-full flex-1 resize-none border-none bg-transparent px-3 py-3 font-mono text-[12.5px] leading-[1.6] outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          aria-label="풀이 코드"
        />
      </div>

      <div>
        <label htmlFor="github-url" className={labelClassName}>
          GitHub commit URL (선택)
        </label>
        <div className="relative">
          <span className="text-muted pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            <GitHubIcon />
          </span>
          <input
            id="github-url"
            className={`${inputClassName} pl-9`}
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
      </div>
    </section>
  );
}
