"use client";
import React, { useEffect, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { defaultKeymap } from "@codemirror/commands";
import { EDITOR_CONFIG } from "@/constants";
import { editorExtensions, SupportedLanguage } from "@/lib";

interface CodeEditorProps {
  language: SupportedLanguage;
  code: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const defaultStyles = {
  border: "1px solid #ddd",
  height: "300px",
} as const;

export const CodeEditor = ({
  language,
  code,
  onChange,
  className,
  style,
}: Readonly<CodeEditorProps>) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef?.current) return;

    const langExtension = editorExtensions[language];
    if (!langExtension) {
      console.warn(`Language extension not found for ${language}`);
      return;
    }

    const view = new EditorView({
      state: EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          keymap.of(defaultKeymap),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newContent = update.state.doc.toString();
              if (newContent.length <= EDITOR_CONFIG.MAX_CODE_LENGTH) {
                onChange(newContent);
              } else {
                const truncatedContent = newContent.slice(
                  0,
                  EDITOR_CONFIG.MAX_CODE_LENGTH
                );
                view.dispatch({
                  changes: {
                    from: 0,
                    to: view.state.doc.length,
                    insert: truncatedContent,
                  },
                });
                onChange(truncatedContent);
              }
            }
          }),
          langExtension(),
        ],
      }),
      parent: editorRef?.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef?.current;
    if (!view || view.state.doc.toString() === code) return;
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: code,
      },
    });
  }, [code]);

  return (
    <div
      ref={editorRef}
      className={className}
      style={{ ...defaultStyles, ...style }}
      role="textbox"
      aria-label={`Редактор кода ${language}`}
      aria-multiline="true"
    />
  );
};
