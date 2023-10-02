import { Offset, Position } from '../models';
import { PositionType } from '../models/position-type';

import { calcPosition } from './calc-position';
import { flipPositionType } from './flip-position-type';

export const resolvePosition = (
  trigger: DOMRect,
  content: DOMRect,
  positionType: PositionType,
  offset: Offset | null,
  mountTarget: DOMRect | null,
  isMountTargetPositionRelative: boolean,
  frame: DOMRect | null,
): Position => {
  const newPosition = calcPosition(
    trigger,
    content,
    positionType,
    offset,
    mountTarget,
    isMountTargetPositionRelative,
  );
  const flippedPositionType = flipPositionType(
    positionType,
    newPosition,
    content,
    mountTarget,
    isMountTargetPositionRelative,
    frame,
  );
  const flippedNewPosition = calcPosition(
    trigger,
    content,
    flippedPositionType,
    offset,
    mountTarget,
    isMountTargetPositionRelative,
  );

  return flippedNewPosition;
};
