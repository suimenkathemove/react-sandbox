export const findIndex = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => unknown,
): number | null => {
  const index = array.findIndex(predicate);
  if (index === -1) return null;

  return index;
};

export const findLastIndex = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => unknown,
): number | null => {
  const index = array.findLastIndex(predicate);
  if (index === -1) return null;

  return index;
};
