"use client";
import React, { memo } from "react";
import { SupportedLanguage } from "@/lib";
import { CharacterCounter, LanguageSelector, RunButton } from "..";

interface EditorControlsProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  code: string;
  onExecute: () => void;
  isLoading: boolean;
  codeLength: number;
  maxLength: number;
}

export const EditorControls = memo(function EditorControls({
  language,
  setLanguage,
  code,
  onExecute,
  isLoading,
  codeLength,
  maxLength,
}: Readonly<EditorControlsProps>) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <RunButton onExecute={onExecute} isLoading={isLoading} code={code} />
      </div>
      <CharacterCounter currentLength={codeLength} maxLength={maxLength} />
    </div>
  );
});
