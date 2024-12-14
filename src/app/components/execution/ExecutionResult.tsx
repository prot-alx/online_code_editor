import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle2, XCircle, Terminal } from "lucide-react";

interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

interface ExecutionResultProps {
  result: ExecutionResult | null;
}

export const ExecutionResult = ({ result }: Readonly<ExecutionResultProps>) => {
  if (!result) {
    return (
      <Alert variant="default">
        <Terminal className="h-4 w-4" />
        <AlertDescription variant="pre">
          Результат будет показан здесь после выполнения кода
        </AlertDescription>
      </Alert>
    );
  }

  const isSuccess = result.success;
  const content = isSuccess ? result.output : `Ошибка: ${result.error}`;

  return (
    <Alert variant={isSuccess ? "success" : "destructive"}>
      {isSuccess ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <XCircle className="h-4 w-4" />
      )}
      <AlertDescription variant="pre">{content}</AlertDescription>
    </Alert>
  );
};
