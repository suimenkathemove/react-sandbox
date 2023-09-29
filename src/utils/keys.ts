export const keys = <T extends string>(object: Record<T, unknown>): T[] =>
  Object.keys(object) as T[];
