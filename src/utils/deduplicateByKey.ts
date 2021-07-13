export const deduplicateByKey = <
  D extends Record<string, any>,
  K extends keyof D
>(
  arr: D[],
  key: K,
) => {
  const entries: Array<[K, D]> = arr.map((v) => [v[key], v]);
  const map = new Map(entries);

  return Array.from(map.values());
};
