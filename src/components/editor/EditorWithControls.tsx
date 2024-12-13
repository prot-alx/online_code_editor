import React, { memo } from "react";
import CodeEditor from "./CodeEditor";
import {
  SupportedLanguage,
  supportedLanguages,
} from "@/lib/utils/supported-languages";

interface EditorWithControlsProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  code: string;
  setCode: (code: string) => void;
  onRun: () => void;
  isLoading: boolean;
}

function EditorWithControls({
  language,
  setLanguage,
  code,
  setCode,
  onRun,
  isLoading,
}: Readonly<EditorWithControlsProps>) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded"
        >
          {supportedLanguages.map((lang) => (
            <option key={lang.name} value={lang.name}>
              {lang.label}
            </option>
          ))}
        </select>
        <button
          onClick={onRun}
          disabled={isLoading || !language || !code.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded
                     hover:bg-blue-600 disabled:opacity-50
                     transition-colors duration-200"
        >
          {isLoading ? "Выполнение..." : "Запустить"}
        </button>
      </div>
      <CodeEditor language={language} code={code} onChange={setCode} />
    </div>
  );
}
// Обернём в мемо для улучшения быстродействия
export default memo(EditorWithControls);
