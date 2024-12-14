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

  const response = await fetch("/api/run-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  const data = await response.json();  

  if (!response.ok) {
    throw new Error(data.error ||`HTTP error! status: ${response?.status}`);
  }

  return data;
}
