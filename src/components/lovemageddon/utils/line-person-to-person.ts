import { getPersonX } from './get-person-x';
import { getPersonY } from './get-person-y';

import { line } from '@/utils/canvas/line';

export const linePersonToPerson = (
  ctx: CanvasRenderingContext2D,
  personToPersonList: Maybe<number>[],
  meCount: number,
  youCount: number,
  meYRatio: number,
  youYRatio: number,
): void => {
  personToPersonList.forEach((you, me) => {
    if (you == null) {
      return;
    }

    line(
      ctx,
      { x: getPersonX(meCount, me + 1), y: getPersonY(meYRatio) },
      { x: getPersonX(youCount, you + 1), y: getPersonY(youYRatio) },
    );
  });
};
