import React from "react";
import { CODE_SAMPLES } from "@/constants";
import { SupportedLanguage } from "@/lib";
import { Card, CardHeader } from "../ui/card";
import { Alert } from "../ui/alert";

interface CodeSamplesProps {
  language: SupportedLanguage;
}

export const CodeSamples = ({ language }: CodeSamplesProps) => {
  const currentSample = CODE_SAMPLES.find(
    (sample) => sample.language === language
  );

  if (!currentSample) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <h3>
          Пример {currentSample.language}
        </h3>
      </CardHeader>
      <Alert>
        <pre className="overflow-x-auto text-sm ">
          <code>{currentSample.code}</code>
        </pre>
      </Alert>
    </Card>
  );
};
