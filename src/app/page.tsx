"use client";
import EditorWithControls from "@/components/editor/EditorWithControls";
import ExecutionResult from "@/components/execution/ExecutionResult";
import { EDITOR_CONFIG, TASK_DESCRIPTION } from "@/constants";
import { SupportedLanguage } from "@/lib/utils/supported-languages";
import React, { useState, useCallback } from "react";
import { runCode } from "./api/code";

interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<SupportedLanguage>(EDITOR_CONFIG.DEFAULT_LANGUAGE);;
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = useCallback(async () => {
    if (!code.trim()) {
      setResult({
        success: false,
        error: "Код не может быть пустым",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const data = await runCode({ code, language });
      setResult(data);
    } catch (error) {
      console.error("Ошибка выполнения:", error);
      setResult({
        success: false,
        error: `Не удалось выполнить код. ${
          error instanceof Error ? error.message : "Неизвестная ошибка"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <section className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{TASK_DESCRIPTION.title}</h2>
        <p>{TASK_DESCRIPTION.content}</p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <EditorWithControls
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          onRun={handleRun}
          isLoading={isLoading}
        />

        <div className="bg-gray-50 p-4 rounded-lg min-h-[300px]">
          <h3 className="text-lg font-semibold mb-2">Результат</h3>
          <ExecutionResult result={result} />
        </div>
      </div>
    </div>
  );
}
