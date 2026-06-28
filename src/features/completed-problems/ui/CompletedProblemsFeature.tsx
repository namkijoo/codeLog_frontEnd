'use client';

import { useCompletedProblems } from '../model/useCompletedProblems';
import { CompletedProblemsTable } from './CompletedProblemsTable';
import { CompletedProblemsToolbar } from './CompletedProblemsToolbar';

export function CompletedProblemsFeature() {
  const {
    boards,
    totalCount,
    isLoading,
    error,
    search,
    setSearch,
    sortKey,
    setSortKey,
    formatDate,
  } = useCompletedProblems();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f9f8ff] px-8 py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-title text-[22px] font-extrabold tracking-tight">완료된 문제 리스트</h1>
          <p className="text-muted mt-1 text-[13px] font-medium">Completed Problem List</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:justify-end">
          <span className="text-secondary text-[13px] font-medium">
            총 완료 문제{' '}
            <strong className="text-title font-bold">{totalCount.toLocaleString()}</strong>개
          </span>
          <span className="text-secondary text-[13px] font-medium">
            현재 스트릭 <strong className="text-title font-bold">14</strong>일 🔥
          </span>
        </div>
      </div>

      <CompletedProblemsToolbar
        search={search}
        onSearchChange={setSearch}
        sortKey={sortKey}
        onSortChange={setSortKey}
      />

      <CompletedProblemsTable
        boards={boards}
        formatDate={formatDate}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
