export const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object";
