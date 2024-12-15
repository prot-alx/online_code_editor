"use client";
import React, { useState } from "react";
import { EDITOR_CONFIG } from "@/constants";
import { SupportedLanguage } from "@/lib";
import { runCode } from "./api/code";
import {
  CodeSamples,
  EditorWithControls,
  ExecutionResult,
  TaskDescription,
} from "@/app/components";

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

  const handleRun = async () => {
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
  };

  return (
    <main className="2xl:container mx-auto px-4 py-8 flex flex-col gap-6">
      <section>
        <TaskDescription />
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <EditorWithControls
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          onExecute={handleRun}
          isLoading={isLoading}
        />

        <article>
          <ExecutionResult result={result} />
        </article>
      </section>

      <section>
        <CodeSamples language={language} />
      </section>
    </main>
  );
}
