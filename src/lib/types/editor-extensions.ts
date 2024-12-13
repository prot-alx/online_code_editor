import { python } from "@codemirror/lang-python";
import { go } from "@codemirror/lang-go";
// Если необходимо добавить другие языки - см. README
// import { javascript } from "@codemirror/lang-javascript";
// import { java } from "@codemirror/lang-java";
// import { cpp } from "@codemirror/lang-cpp";
// import { rust } from "@codemirror/lang-rust";
// Раскомментировать настройки в lib/utils/supported-languages.ts
import { SupportedLanguage } from "../utils/supported-languages";
import { LanguageSupport } from "@codemirror/language";

export const editorExtensions: Record<
  SupportedLanguage,
  () => LanguageSupport
> = {
  python: python,
  go: go,
  // javascript: () => javascript({ typescript: false }),
  // java: java,
  // cpp: cpp,
  // rust: rust,
};
