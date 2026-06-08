import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';
import { EditorView } from '@codemirror/view';

const editorTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: '#fafafa',
      fontSize: '12.5px',
      height: '100%',
    },
    '.cm-editor': {
      height: '100%',
    },
    '.cm-scroller': {
      fontFamily: 'var(--font-family-mono, ui-monospace, monospace)',
      lineHeight: '1.6',
      overflow: 'auto',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '.cm-content': {
      caretColor: '#7c3aed',
      padding: '12px 0',
    },
    '.cm-gutters': {
      backgroundColor: '#f5f5f7',
      color: '#9ca3af',
      border: 'none',
      borderRight: '1px solid #e5e3f5',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#ede9fe',
      color: '#7c3aed',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(124, 58, 237, 0.04)',
    },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
      backgroundColor: 'rgba(124, 58, 237, 0.15) !important',
    },
    '.cm-cursor': {
      borderLeftColor: '#7c3aed',
    },
  },
  { dark: false },
);

const highlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#7c3aed', fontWeight: '600' },
  { tag: [t.name, t.deleted, t.character, t.propertyName], color: '#374151' },
  { tag: [t.function(t.variableName), t.labelName], color: '#2563eb' },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#d97706' },
  { tag: [t.definition(t.name), t.separator], color: '#374151' },
  { tag: [t.typeName, t.className], color: '#0891b2' },
  { tag: [t.number, t.changed, t.annotation], color: '#d97706' },
  { tag: [t.operator, t.punctuation, t.bracket], color: '#6b7280' },
  { tag: [t.string, t.special(t.string)], color: '#059669' },
  { tag: [t.comment, t.meta], color: '#9ca3af', fontStyle: 'italic' },
  { tag: t.invalid, color: '#dc2626' },
]);

export const codeEditorTheme: Extension[] = [editorTheme, syntaxHighlighting(highlightStyle)];
