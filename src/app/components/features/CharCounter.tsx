import { cn } from "@/lib";
import { memo } from "react";

interface CharacterCounterProps {
  currentLength: number;
  maxLength: number;
}

export const CharacterCounter = memo(function CharacterCounter({
  currentLength,
  maxLength,
}: Readonly<CharacterCounterProps>) {
  const isWarning = currentLength > maxLength * 0.8;
  const isLimit = currentLength >= maxLength;

  return (
    <p
      className={cn(
        "text-sm text-gray-500",
        { "text-amber-600": isWarning && !isLimit },
        { "text-red-600": isLimit }
      )}
    >
      {isLimit
        ? "Достигнут лимит символов!"
        : `Осталось символов: ${maxLength - currentLength}`}
    </p>
  );
});
