export function logError(error: unknown, context?: string): void {
  if (context) console.error(`[Context]: ${context}`);
  console.error(`[Error]:`, error);
}
