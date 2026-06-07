'use client';

import { DIFFICULTIES, PLATFORMS } from '../model/constants';
import type { useProblemRecord } from '../model/useProblemRecord';
import { cardClassName, inputClassName, labelClassName } from './styles';

type ProblemFormProps = Pick<
  ReturnType<typeof useProblemRecord>,
  | 'platform'
  | 'setPlatform'
  | 'problemNumber'
  | 'setProblemNumber'
  | 'difficulty'
  | 'setDifficulty'
  | 'title'
  | 'setTitle'
  | 'problemUrl'
  | 'setProblemUrl'
  | 'tags'
  | 'tagInput'
  | 'setTagInput'
  | 'removeTag'
  | 'handleTagKeyDown'
  | 'memo'
  | 'setMemo'
>;

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProblemForm({
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
  removeTag,
  handleTagKeyDown,
  memo,
  setMemo,
}: ProblemFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <section className={cardClassName}>
        <div className="mb-4">
          <span className={labelClassName}>플랫폼명</span>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((item) => {
              const isSelected = platform === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPlatform(item)}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                    isSelected
                      ? 'border-brand bg-brand text-white'
                      : 'border-[#e5e3f5] bg-white text-secondary hover:border-[#c4b5fd] hover:bg-[#faf8ff]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="problem-number" className={labelClassName}>
              문제번호
            </label>
            <input
              id="problem-number"
              className={inputClassName}
              type="text"
              value={problemNumber}
              onChange={(e) => setProblemNumber(e.target.value)}
              placeholder="14502"
            />
          </div>
          <div>
            <label htmlFor="difficulty" className={labelClassName}>
              난이도
            </label>
            <select
              id="difficulty"
              className={`${inputClassName} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-size-[12px] bg-position-[right_12px_center] bg-no-repeat pr-9`}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
            >
              {DIFFICULTIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="problem-title" className={labelClassName}>
            제목
          </label>
          <input
            id="problem-title"
            className={inputClassName}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="문제 제목"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="problem-url" className={labelClassName}>
            문제주소 URL
          </label>
          <div className="relative">
            <span className="text-muted pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
              <LinkIcon />
            </span>
            <input
              id="problem-url"
              className={`${inputClassName} pl-9`}
              type="url"
              value={problemUrl}
              onChange={(e) => setProblemUrl(e.target.value)}
              placeholder="https://"
            />
          </div>
        </div>

        <div>
          <span className={labelClassName}>태그</span>
          {tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-[#f3f0ff] px-2 py-1 text-[12px] font-semibold text-brand"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-brand/60 hover:text-brand cursor-pointer border-none bg-transparent p-0 text-[11px] leading-none"
                    aria-label={`${tag} 태그 제거`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <input
            className={inputClassName}
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="태그 입력 후 Enter"
          />
        </div>
      </section>

      <section className={cardClassName}>
        <h2 className="text-title mb-3 text-[14px] font-bold">풀이 메모</h2>
        <textarea
          className={`${inputClassName} min-h-[160px] resize-y leading-relaxed`}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="풀이 과정, 핵심 아이디어, 주의할 점 등을 기록하세요"
        />
      </section>
    </div>
  );
}
