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
  const maxLength = 1000;

  return (
    <div
      className={`p-3 rounded ${
        isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {content && content.length > maxLength
        ? `${content.slice(0, maxLength)}...`
        : content}
    </div>
  );
}
