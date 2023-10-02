import { Offset, Position } from '../models';
import { PositionType } from '../models/position-type';

import { calcPosition } from './calc-position';
import { flipPositionType } from './flip-position-type';

export const resolvePosition = (
  trigger: DOMRect,
  content: DOMRect,
  positionType: PositionType,
  offset?: Offset,
  mountTarget?: DOMRect,
  frame?: DOMRect,
): Position => {
  const newPosition = calcPosition(
    trigger,
    content,
    positionType,
    offset,
    mountTarget,
  );
  const flippedPositionType = flipPositionType(
    positionType,
    newPosition,
    content,
    mountTarget,
    frame,
  );
  const flippedNewPosition = calcPosition(
    trigger,
    content,
    flippedPositionType,
    offset,
    mountTarget,
  );

  return flippedNewPosition;
};
