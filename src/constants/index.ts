export const TASK_DESCRIPTION = {
  title: "Условие задачи",
  content:
    "Напишите программу, которая принимает два числа и выводит их сумму. Программа должна корректно обрабатывать различные входные данные.",
};

export const EDITOR_CONFIG = {
  MAX_CODE_LENGTH: 20,
  EXECUTION_TIMEOUT: 10000,
  DEFAULT_LANGUAGE: 'python' as const,
  ERROR_MESSAGES: {
    CODE_TOO_LONG: (length: number) => 
      `Код превышает максимально допустимую длину (${length} символов)`,
    EMPTY_CODE: 'Код не может быть пустым',
  }
} as const;