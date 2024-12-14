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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map((lang) => (
          <SelectItem key={lang.name} value={lang.name}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
