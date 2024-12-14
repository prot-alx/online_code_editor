import React, { useState } from "react";
import copy from "clipboard-copy";
import { CODE_SAMPLES } from "@/constants";
import { SupportedLanguage } from "@/lib";
import { Copy, Check } from "lucide-react";
import { Alert, Button, Card, CardHeader } from "../ui";

interface CodeSamplesProps {
  language: SupportedLanguage;
}

export const CodeSamples = ({ language }: CodeSamplesProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const currentSample = CODE_SAMPLES.find(
    (sample) => sample.language === language
  );

  if (!currentSample) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await copy(currentSample.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <h3>Пример {currentSample.language}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">
            {isCopied ? "Скопировано" : "Копировать код"}
          </span>
        </Button>
      </CardHeader>
      <Alert>
        <pre className="overflow-x-auto text-sm">
          <code>{currentSample.code}</code>
        </pre>
      </Alert>
    </Card>
  );
};
