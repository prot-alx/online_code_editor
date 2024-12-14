export const TASK_DESCRIPTION = {
  title: "Условие задачи",
  content:
    "Напишите программу, которая принимает два числа и выводит их сумму. Программа должна корректно обрабатывать различные входные данные.",
};

export const EDITOR_CONFIG = {
  MAX_CODE_LENGTH: 200,
  EXECUTION_TIMEOUT: 10000,
  DEFAULT_LANGUAGE: "python",
  ERROR_MESSAGES: {
    CODE_TOO_LONG: (length: number) =>
      `Код превышает максимально допустимую длину (${length} символов)`,
    EMPTY_CODE: "Код не может быть пустым",
  },
};

export const CODE_SAMPLES = [
  {
    language: 'python',
    code: `n = 5
string = "Hello World "
print(string * n)`
  },
  {
    language: 'go',
    code: `package main

import "fmt"

func main() {
    fmt.Println("hello world")
}`
  },
  // Можно добавить образцы для других языков
  // javascript,
  // java,
  // cpp,
  // rust,
];