import { EDITOR_CONFIG } from "@/constants";

interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

interface ExecutionResultProps {
  result: ExecutionResult | null;
}

export default function ExecutionResult({
  result,
}: Readonly<ExecutionResultProps>) {
  if (!result) {
    return (
      <p className="text-gray-500">
        Результат будет показан здесь после выполнения кода
      </p>
    );
  }

  const isSuccess = result.success;
  const content = isSuccess ? result.output : `Ошибка: ${result.error}`;
  const truncatedContent =
    content && content.length > EDITOR_CONFIG.MAX_CODE_LENGTH
      ? `${content.slice(0, EDITOR_CONFIG.MAX_CODE_LENGTH)}...`
      : content;

  return (
    <div
      className={`p-3 rounded ${
        isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      <pre className="whitespace-pre-wrap break-words">{truncatedContent}</pre>
    </div>
  );
}
