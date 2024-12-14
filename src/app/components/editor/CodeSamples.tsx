import React, { useState } from "react";
import { CODE_SAMPLES } from "@/constants";
import { SupportedLanguage } from "@/lib";
import { Card, CardHeader } from "../ui/card";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";

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
    await navigator.clipboard.writeText(currentSample.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
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
