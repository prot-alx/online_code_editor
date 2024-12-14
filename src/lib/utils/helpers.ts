import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type StringCallback = (arg: string) => void;

export function debounce(func: StringCallback, delay: number): StringCallback {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (arg: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(arg), delay);
  };
}
