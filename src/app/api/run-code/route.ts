import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { supportedLanguages } from "@/lib/utils/supported-languages";
import { EDITOR_CONFIG } from "@/constants";

// Нужно для того, чтобы в докере корректно проходила проверка установлен ли язык
function checkCommandExists(command: string): Promise<boolean> {
  return new Promise((resolve) => {
    const checkCommand = process.platform === "win32" ? "where" : "which";
    exec(`${checkCommand} ${command}`, (error) => {
      console.log(`Checking ${command}:`, error ? "not found" : "found");
      resolve(!error);
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Валидация наличия необходимых полей
    if (!data || typeof data !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request data",
        },
        { status: 400 }
      );
    }

    const { code, language } = data;

    if (typeof code !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Code must be a string",
        },
        { status: 400 }
      );
    }

    if (!language || typeof language !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Language is required and must be a string",
        },
        { status: 400 }
      );
    }

    console.log("Received request:", { language, codeLength: code.length });

    if (!code.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: EDITOR_CONFIG.ERROR_MESSAGES.EMPTY_CODE,
        },
        { status: 400 }
      );
    }

    if (code.length > EDITOR_CONFIG.MAX_CODE_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: EDITOR_CONFIG.ERROR_MESSAGES.CODE_TOO_LONG(
            EDITOR_CONFIG.MAX_CODE_LENGTH
          ),
        },
        { status: 400 }
      );
    }

    // Находим конфигурацию для указанного языка
    const langConfig = supportedLanguages.find(
      (lang) => lang.name === language
    );

    if (!langConfig) {
      console.error("Language not found:", language);
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported language: ${language}`,
        },
        { status: 400 }
      );
    }

    // Проверяем доступность команды для выбранного языка
    const isCommandAvailable = await checkCommandExists(
      langConfig.checkCommand
    );
    console.log("Command availability:", {
      command: langConfig.checkCommand,
      isAvailable: isCommandAvailable,
    });

    if (!isCommandAvailable) {
      return NextResponse.json(
        {
          success: false,
          error: `${langConfig.label} не установлен в системе. Убедитесь, что Go установлен и доступен через командную строку.`,
        },
        { status: 500 }
      );
    }

    // Создаем временный файл
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const timestamp = Date.now();
    const filename = path.join(
      tempDir,
      `script_${timestamp}.${langConfig.extension}`
    );

    console.log("Creating temp file:", filename);
    fs.writeFileSync(filename, code);

    // Формируем и выполняем команду
    return new Promise<NextResponse>((resolve) => {
      const command = langConfig.command(filename);
      console.log("Executing command:", command);

      exec(
        command,
        {
          timeout: EDITOR_CONFIG.EXECUTION_TIMEOUT,
          env: { ...process.env },
        },
        (error, stdout, stderr) => {
          try {
            // Удаляем временный файл
            fs.unlinkSync(filename);
            console.log("Temp file cleaned up");

            if (error) {
              console.error("Execution error:", { error, stderr });
              resolve(
                NextResponse.json(
                  {
                    success: false,
                    error: stderr || error.message,
                  },
                  { status: 500 }
                )
              );
            } else {
              console.log("Execution successful:", { stdout });
              resolve(
                NextResponse.json({
                  success: true,
                  output: stdout,
                })
              );
            }
          } catch (err) {
            console.error("Error during file cleanup or response:", err);
            resolve(
              NextResponse.json(
                {
                  success: false,
                  error:
                    err instanceof Error
                      ? err.message
                      : "Unexpected error occurred",
                },
                { status: 500 }
              )
            );
          }
        }
      );
    });
  } catch (error) {
    console.error("Request handling error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
