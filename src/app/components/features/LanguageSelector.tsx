import { memo } from "react";
import { SupportedLanguage, supportedLanguages } from "@/lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface LanguageSelectorProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const LanguageSelector = memo(function LanguageSelector({
  language,
  setLanguage,
}: Readonly<LanguageSelectorProps>) {
  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger
        className="w-[180px]"
        aria-label="Выбор языка программирования"
      >
        {/* На случай, если питон не будем по умолчанию нужен плейсхолдер */}
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
