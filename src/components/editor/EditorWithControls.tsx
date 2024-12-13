import React, { memo, useCallback, useEffect } from "react";
import { SupportedLanguage, supportedLanguages, cn } from "@/lib";
import { EDITOR_CONFIG } from "@/constants";
import { CodeEditor } from "..";

interface EditorWithControlsProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  code: string;
  setCode: (code: string) => void;
  onRun: () => void;
  isLoading: boolean;
}

export const EditorWithControls = memo(function EditorWithControls({
  language,
  setLanguage,
  code,
  setCode,
  onRun,
  isLoading,
}: Readonly<EditorWithControlsProps>) {
  const handleCodeChange = useCallback(
    (newCode: string) => {
      if (newCode.length <= EDITOR_CONFIG.MAX_CODE_LENGTH) {
        setCode(newCode);
      } else {
        setCode(newCode.slice(0, EDITOR_CONFIG.MAX_CODE_LENGTH));
      }
    },
    [setCode]
  );

  const handleKeyDown = useCallback(
    (event: Event) => {
      if (event instanceof KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();
          if (!isLoading && code.trim()) {
            onRun();
          }
        }
      }
    },
    [onRun, isLoading, code]
  );

  useEffect(() => {
    const editorElement = document.querySelector(".editor-container");
    if (editorElement) {
      editorElement.addEventListener("keydown", handleKeyDown, true);
      return () => {
        editorElement.removeEventListener("keydown", handleKeyDown, true);
      };
    }
  }, [handleKeyDown]);

  return (
    <div className="editor-container space-y-4">
      <div className="flex items-center gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded cursor-pointer h-10"
        >
          {supportedLanguages.map((lang) => (
            <option key={lang.name} value={lang.name}>
              {lang.label}
            </option>
          ))}
        </select>
        <button
          onClick={onRun}
          disabled={isLoading || !code.trim()}
          className="bg-blue-500 text-white h-10 px-4 py-2 rounded
                     hover:bg-blue-600 disabled:opacity-50
                     transition-colors duration-200"
        >
          {isLoading ? "Выполнение..." : "Запустить (Ctrl+Enter)"}
        </button>
      </div>
      <CodeEditor language={language} code={code} onChange={handleCodeChange} />
      <p
        className={cn(
          "text-sm text-gray-500",
          {
            "text-amber-600": code.length > EDITOR_CONFIG.MAX_CODE_LENGTH * 0.8,
          },
          { "text-red-600": code.length >= EDITOR_CONFIG.MAX_CODE_LENGTH }
        )}
      >
        {code.length >= EDITOR_CONFIG.MAX_CODE_LENGTH
          ? "Достигнут лимит символов!"
          : `Осталось символов: ${EDITOR_CONFIG.MAX_CODE_LENGTH - code.length}`}
      </p>
    </div>
  );
});
