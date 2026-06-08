'use client';

import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useRef, useState } from 'react';
import type { LanguageId } from '../model/constants';
import { codeEditorTheme } from '../lib/editorTheme';
import { getLanguageExtension } from '../lib/languageExtensions';

type CodeMirrorEditorProps = {
  value: string;
  language: LanguageId;
  onChange: (value: string) => void;
};

export function CodeMirrorEditor({ value, language, onChange }: CodeMirrorEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateHeight = () => {
      setHeight(container.clientHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full min-h-0 w-full">
      {height > 0 && (
        <CodeMirror
          value={value}
          height={`${height}px`}
          theme="none"
          extensions={[...codeEditorTheme, ...getLanguageExtension(language)]}
          onChange={onChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: false,
            dropCursor: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: false,
            rectangularSelection: false,
            crosshairCursor: false,
            highlightSelectionMatches: false,
            searchKeymap: false,
          }}
        />
      )}
    </div>
  );
}
