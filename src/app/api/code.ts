import type { ExecutionResult } from "@/lib/types/execution";
import type { SupportedLanguage } from "@/lib/utils/supported-languages";

interface RunCodeParams {
  code: string;
  language: SupportedLanguage;
}

export async function runCode({
  code,
  language,
}: RunCodeParams): Promise<ExecutionResult> {
  console.log("Отправка кода на выполнение:", { code, language });

  const response = await fetch("/api/run-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  console.log("Статус ответа:", response?.status);

  const data = await response.json();  

  if (!response.ok) {
    throw new Error(data.error ||`HTTP error! status: ${response?.status}`);
  }

  console.log("Полученные данные:", data);
  return data;
}
