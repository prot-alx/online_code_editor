import React, { useRef } from "react";
import { debounce, SupportedLanguage } from "@/lib";
import { EDITOR_CONFIG } from "@/constants";
import { CodeEditor, EditorControls } from "..";
import { Card, CardContent } from "../ui";

interface EditorWithControlsProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  code: string;
  setCode: (code: string) => void;
  onExecute: () => void;
  isLoading: boolean;
}

export const EditorWithControls = ({
  language,
  setLanguage,
  code,
  setCode,
  onExecute,
  isLoading,
}: Readonly<EditorWithControlsProps>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleCodeChange = (newCode: string) => {
    if (newCode.length <= EDITOR_CONFIG.MAX_CODE_LENGTH) {
      setCode(newCode);
    } else {
      setCode(newCode.slice(0, EDITOR_CONFIG.MAX_CODE_LENGTH));
    }
  };

  const debouncedHandleCodeChange = debounce(handleCodeChange, 200);

  return (
    <div ref={containerRef} className="space-y-4">
      <Card>
        <CardContent>
          <EditorControls
            language={language}
            setLanguage={setLanguage}
            code={code}
            onExecute={onExecute}
            isLoading={isLoading}
            codeLength={code.length}
            maxLength={EDITOR_CONFIG.MAX_CODE_LENGTH}
          />
          <CodeEditor
            language={language}
            code={code}
            onChange={debouncedHandleCodeChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
