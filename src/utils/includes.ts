export const includes = <T extends any[] | readonly any[]>(
  arr: T,
  val: unknown,
): val is T[number] => arr.includes(val);
