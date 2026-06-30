'use client';

import CodeMirror from '@uiw/react-codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { LanguageId } from '../model/constants';
import { codeEditorTheme } from '../lib/editorTheme';
import { getLanguageExtension } from '../lib/languageExtensions';

type CodeMirrorEditorProps = {
  value: string;
  language: LanguageId;
  onChange: (value: string) => void;
  readOnly?: boolean;
};

export function CodeMirrorEditor({ value, language, onChange, readOnly = false }: CodeMirrorEditorProps) {
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

  const extensions = useMemo(() => {
    const base = [...codeEditorTheme, ...getLanguageExtension(language)];
    if (!readOnly) return base;
    return [...base, EditorState.readOnly.of(true), EditorView.editable.of(false)];
  }, [language, readOnly]);

  return (
    <div ref={containerRef} className="h-full min-h-0 w-full">
      {height > 0 && (
        <CodeMirror
          key={readOnly ? 'readonly' : 'editable'}
          value={value}
          height={`${height}px`}
          theme="none"
          editable={!readOnly}
          extensions={extensions}
          onChange={onChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: !readOnly,
            highlightActiveLine: !readOnly,
            foldGutter: false,
            dropCursor: !readOnly,
            indentOnInput: !readOnly,
            bracketMatching: true,
            closeBrackets: !readOnly,
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
