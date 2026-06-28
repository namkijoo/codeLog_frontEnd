import type { SortKey } from '../model/types';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'date', label: '날짜' },
  { key: 'difficulty', label: '난이도' },
  { key: 'platform', label: '플랫폼' },
  { key: 'tags', label: '태그' },
];

type CompletedProblemsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
};

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function CompletedProblemsToolbar({
  search,
  onSearchChange,
  sortKey,
  onSortChange,
}: CompletedProblemsToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative max-w-md flex-1">
        <span className="text-muted pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="검색..."
          className="w-full rounded-[10px] border border-[#e5e3f5] bg-white py-2.5 pr-4 pl-10 text-[13.5px] text-title outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-brand focus:shadow-[0_0_0_3px_rgba(124,58,237,.12)]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map((option) => {
          const isActive = sortKey === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onSortChange(option.key)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                isActive
                  ? 'border-brand bg-brand text-white'
                  : 'border-[#e5e3f5] bg-white text-secondary hover:border-[#c4b5fd] hover:bg-[#faf8ff]'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
