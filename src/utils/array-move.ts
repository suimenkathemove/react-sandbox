import { invariant } from '@/utils/invariant';

export const arrayMove = <T>(array: T[], from: number, to: number): T[] => {
  invariant(0 <= from && from <= array.length - 1, '"from" is within range');
  invariant(0 <= to && to <= array.length - 1, '"to" is within range');

  const newArray = [...array];
  const item = newArray.splice(from, 1)[0];
  invariant(item != null, 'item should exist');
  newArray.splice(to, 0, item);

  return newArray;
};
