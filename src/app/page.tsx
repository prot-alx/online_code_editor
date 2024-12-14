"use client";
import React, { useState, useCallback } from "react";
import { EDITOR_CONFIG, TASK_DESCRIPTION } from "@/constants";
import { SupportedLanguage } from "@/lib";
import { runCode } from "./api/code";
import {
  CodeSamples,
  EditorWithControls,
  ExecutionResult,
} from "@/app/components";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Alert } from "./components/ui/alert";

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
      <section>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">{TASK_DESCRIPTION.title}</h2>
          </CardHeader>
          <Alert className="bg-slate-5">{TASK_DESCRIPTION.content}</Alert>
        </Card>
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
        <article>
          <Card className="h-full">
            <CardContent>
              <CardHeader>
                <h3>Результат</h3>
              </CardHeader>
              <ExecutionResult result={result} />
            </CardContent>
          </Card>
        </article>
      </section>
      <section>
        <CodeSamples language={language} />
      </section>
    </main>
  );
}
