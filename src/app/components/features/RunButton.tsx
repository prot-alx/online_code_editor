"use client";
import { Loader2 } from "lucide-react";
import { Button } from "../ui";

interface RunButtonProps {
  onExecute: () => void;
  isLoading: boolean;
  code: string;
}

export const RunButton = ({ onExecute, isLoading, code }: RunButtonProps) => {
  const isCodeEmpty = !code.trim();

  return (
    <Button
      onClick={onExecute}
      disabled={isLoading || isCodeEmpty}
      variant="default"
      aria-label="RunCode"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Выполнение...
        </>
      ) : (
        <span>Запустить</span>
      )}
    </Button>
  );
};
