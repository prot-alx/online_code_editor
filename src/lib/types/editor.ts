import { SupportedLanguage } from "../utils/supported-languages";

export interface CodeEditorProps {
  language: SupportedLanguage;
  code: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
