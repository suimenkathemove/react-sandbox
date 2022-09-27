import { POINT_RADIUS } from '../constants';

import { getPersonX } from './get-person-x';
import { getPersonY } from './get-person-y';

import { point } from '@/utils/canvas/point';

export const pointPerson = (
  ctx: CanvasRenderingContext2D,
  personCount: number,
  personYRatio: number,
): void => {
  for (let i = 0; i < personCount; i++) {
    point(
      ctx,
      { x: getPersonX(personCount, i + 1), y: getPersonY(personYRatio) },
      POINT_RADIUS,
    );
  }
};
