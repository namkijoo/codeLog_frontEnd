'use client';

import { useProblemRecord } from '../model/useProblemRecord';
import { CodeEditorPanel } from './CodeEditorPanel';
import { ProblemForm } from './ProblemForm';
import { ProblemRecordFooter } from './ProblemRecordFooter';

export function ProblemRecordFeature() {
  const record = useProblemRecord();

  return (
    <>
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <h1 className="text-title mb-6 text-[22px] font-extrabold tracking-tight">
          새로운 풀이를 기록해볼까요? ✏️
        </h1>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <ProblemForm
            platform={record.platform}
            setPlatform={record.setPlatform}
            problemNumber={record.problemNumber}
            setProblemNumber={record.setProblemNumber}
            difficulty={record.difficulty}
            setDifficulty={record.setDifficulty}
            title={record.title}
            setTitle={record.setTitle}
            problemUrl={record.problemUrl}
            setProblemUrl={record.setProblemUrl}
            tags={record.tags}
            tagInput={record.tagInput}
            setTagInput={record.setTagInput}
            removeTag={record.removeTag}
            handleTagKeyDown={record.handleTagKeyDown}
            memo={record.memo}
            setMemo={record.setMemo}
          />
          <CodeEditorPanel
            language={record.language}
            setLanguage={record.setLanguage}
            code={record.code}
            setCode={record.setCode}
            githubUrl={record.githubUrl}
            setGithubUrl={record.setGithubUrl}
            codeStats={record.codeStats}
          />
        </div>
      </div>

      <ProblemRecordFooter saveDraft={record.saveDraft} submitRecord={record.submitRecord} />
    </>
  );
}
