export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export async function safeAsync<T>(
  fn: () => Promise<T>
): Promise<[T | null, string | null]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
}