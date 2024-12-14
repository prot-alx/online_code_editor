"use client";
import React, { memo } from "react";
import { SupportedLanguage } from "@/lib";
import { CharacterCounter, LanguageSelector, RunButton } from "..";

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
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <RunButton onRun={onRun} isLoading={isLoading} code={code} />
      </div>
      <CharacterCounter currentLength={codeLength} maxLength={maxLength} />
    </div>
  );
});
