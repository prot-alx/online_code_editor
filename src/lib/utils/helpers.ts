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
