import React, { memo } from "react";
import { cn, SupportedLanguage, supportedLanguages } from "@/lib";

interface EditorControlsProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  code: string;
  onRun: () => void;
  isLoading: boolean;
  codeLength: number;
  maxLength: number;
}

export const EditorControls = memo(function EditorControls({
  language,
  setLanguage,
  code,
  onRun,
  isLoading,
  codeLength,
  maxLength,
}: Readonly<EditorControlsProps>) {
  const emberStyleText = codeLength > maxLength * 0.8;
  const redStyleText = codeLength >= maxLength;

  return (
    <div className="space-y-4">
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
      <p
        className={cn(
          "text-sm text-gray-500",
          { "text-amber-600": emberStyleText },
          { "text-red-600": redStyleText }
        )}
      >
        {redStyleText
          ? "Достигнут лимит символов!"
          : `Осталось символов: ${maxLength - codeLength}`}
      </p>
    </div>
  );
});
