/**
 * Конфигурация поддерживаемых языков для выполнения кода на сервере
 *
 * @property name - Уникальный идентификатор языка
 * @property label - Отображаемое имя языка в интерфейсе
 * @property extension - Расширение файла для данного языка
 * @property command - Функция, возвращающая команду для выполнения кода
 * @property checkCommand - Команда для проверки наличия языка в системе
 **/

export interface Language {
  name: string;
  label: string;
  extension: string;
  command: (filename: string) => string;
  checkCommand: string;
}

export const supportedLanguages: Language[] = [
  {
    name: "python",
    label: "Python",
    extension: "py",
    command: (filename: string) => `python ${filename}`,
    checkCommand: "python",
  },
  {
    name: "go",
    label: "Go",
    extension: "go",
    command: (filename: string) => `go run ${filename}`,
    checkCommand: "go",
  },

  // Если необходимо добавить другие языки - см. README
  // Раскомментировать импорты в lib/types/editor-extentions.ts
  // {
  //   name: 'javascript',
  //   label: 'JavaScript',
  //   extension: 'js',
  //   command: (filename: string) => `node ${filename}`,
  //   checkCommand: 'node'
  // },
  // {
  //   name: 'java',
  //   label: 'Java',
  //   extension: 'java',
  //   command: (filename: string) => `java ${filename}`,
  //   checkCommand: 'java'
  // },
  // {
  //   name: 'cpp',
  //   label: 'C++',
  //   extension: 'cpp',
  //   command: (filename: string) => `g++ ${filename} -o temp && ./temp`,
  //   checkCommand: 'g++'
  // },
  // {
  //   name: 'rust',
  //   label: 'Rust',
  //   extension: 'rs',
  //   command: (filename: string) => `rustc ${filename} -o temp && ./temp`,
  //   checkCommand: 'rustc'
  // }
];

// Создаем тип из массива языков для передачи в компонент, роут и editor-extentions
export type SupportedLanguage = (typeof supportedLanguages)[number]["name"];
