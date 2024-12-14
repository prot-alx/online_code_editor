import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle2, XCircle, Terminal } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

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
      <Card className="h-full">
        <CardContent>
          <CardHeader>
            <h3>Результат</h3>
          </CardHeader>
          <Alert variant="default">
            <Terminal className="h-4 w-4" />
            <AlertDescription variant="pre">
              Результат будет показан здесь после выполнения кода
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const isSuccess = result.success;
  const content = isSuccess ? result.output : `Ошибка: ${result.error}`;

  return (
    <Card className="h-full">
      <CardContent>
        <CardHeader>
          <h3>Результат</h3>
        </CardHeader>
        <Alert variant={isSuccess ? "success" : "destructive"}>
          {isSuccess ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertDescription variant="pre">{content}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
