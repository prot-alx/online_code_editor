"use client";
import React, { useState, useCallback } from "react";
import { EDITOR_CONFIG, TASK_DESCRIPTION } from "@/constants";
import { SupportedLanguage } from "@/lib";
import { runCode } from "./api/code";
import { EditorWithControls, ExecutionResult } from "@/app/components";

interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<SupportedLanguage>(
    EDITOR_CONFIG.DEFAULT_LANGUAGE
  );
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = useCallback(async () => {
    if (!code.trim()) {
      setResult({
        success: false,
        error: "Содержимое поля не может быть пустым",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const data = await runCode({ code, language });
      if (data) {
        setResult(data);
      }
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
    <main className="2xl:container mx-auto px-4 py-8 flex flex-col gap-6">
      <section className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{TASK_DESCRIPTION.title}</h2>
        <p>{TASK_DESCRIPTION.content}</p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <EditorWithControls
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          onRun={handleRun}
          isLoading={isLoading}
        />

        <article className="bg-gray-50 p-4 rounded-lg min-h-[300px]">
          <h3 className="text-lg font-semibold mb-2">Результат</h3>
          <ExecutionResult result={result} />
        </article>
      </section>
    </main>
  );
}
