import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface RunButtonProps {
  onRun: () => void;
  isLoading: boolean;
  code: string;
}

export const RunButton = ({ onRun, isLoading, code }: RunButtonProps) => {
  return (
    <Button
      onClick={onRun}
      disabled={isLoading || !code.trim()}
      variant="default"
      className="min-w-[100px]"
      aria-label="RunCode"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Выполнение...
        </>
      ) : (
        <>
          <span className="sm:hidden">Запустить</span>
          <span className="hidden sm:inline">Запустить (Ctrl+Enter)</span>
        </>
      )}
    </Button>
  );
};
