import { memo } from "react";
import { SupportedLanguage, supportedLanguages } from "@/lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";

interface LanguageSelectorProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const LanguageSelector = memo(function LanguageSelector({
  language,
  setLanguage,
}: Readonly<LanguageSelectorProps>) {
  return (
    <Select
      value={language}
      onValueChange={setLanguage}
      aria-label="Язык программирования"
      aria-description="Выберите язык программирования для редактора кода"
    >
      <SelectTrigger
        aria-label="Выбор языка программирования"
      >
        {/* плейсхолдер на случай, если питон не будет выставлен по умолчанию */}
        <SelectValue placeholder="Выберите язык" />
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map((lang) => (
          <SelectItem
            key={lang.name}
            value={lang.name}
            aria-label={`Выбрать язык ${lang.label}`}
          >
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
