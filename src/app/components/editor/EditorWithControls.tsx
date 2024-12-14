import React, { memo, useCallback, useEffect, useRef } from "react";
import { debounce, SupportedLanguage } from "@/lib";
import { EDITOR_CONFIG } from "@/constants";
import { CodeEditor, EditorControls } from "..";
import { Card, CardContent } from "../ui";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCodeChange = (newCode: string) => {
    if (newCode.length <= EDITOR_CONFIG.MAX_CODE_LENGTH) {
      setCode(newCode);
    } else {
      setCode(newCode.slice(0, EDITOR_CONFIG.MAX_CODE_LENGTH));
    }
  };

  // Обернем в дебаунс ввод текса, чтобы избежать излишне частого ререндера
  // Дебаунс написан вручную, но можно добавить и пакет use-debounce
  const debouncedHandleCodeChange = debounce(handleCodeChange, 200);

  const handleKeyDown = useCallback(
    (event: Event) => {
      if (event instanceof KeyboardEvent) {
        // metakey для макбука
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          event.preventDefault();
          if (!isLoading && code.trim()) {
            onRun();
          }
        }
      }
    },
    [onRun, isLoading, code]
  );

  useEffect(() => {
    const element = containerRef?.current;
    if (element) {
      element.addEventListener("keydown", handleKeyDown, true);
      return () => {
        element.removeEventListener("keydown", handleKeyDown, true);
      };
    }
  }, [handleKeyDown]);

  return (
    <div ref={containerRef} className="space-y-4">
      <Card>
        <CardContent>
          <EditorControls
            language={language}
            setLanguage={setLanguage}
            code={code}
            onRun={onRun}
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
});
