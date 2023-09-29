import { Position } from '../models';
import { PositionType, PositionTypeUnit } from '../models/position-type';

import { splitPositionType } from './split-position-type';

const flipPositionTypeUnit = (
  positionTypeUnit: PositionTypeUnit,
): PositionTypeUnit => {
  switch (positionTypeUnit) {
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    default:
      // TODO: satisfies never
      return positionTypeUnit;
  }
};

const shouldFlipPositionTypeUnit = (
  positionTypeUnit: PositionTypeUnit,
  position: Position,
  content: DOMRect,
  frame?: DOMRect,
): boolean => {
  switch (positionTypeUnit) {
    case 'top': {
      const edgeTop = position.top;
      const frameTop = window.scrollY + (frame?.top ?? 0);

      return edgeTop < frameTop;
    }
    case 'bottom': {
      const edgeBottom = position.top + content.height;
      const frameBottom =
        window.scrollY + (frame?.bottom ?? window.innerHeight);

      return edgeBottom > frameBottom;
    }
    case 'left': {
      const edgeLeft = position.left;
      const frameLeft = window.scrollX + (frame?.left ?? 0);

      return edgeLeft < frameLeft;
    }
    case 'right': {
      const edgeRight = position.left + content.width;
      const frameRight = window.scrollY + (frame?.right ?? window.innerWidth);

      return edgeRight > frameRight;
    }
    default:
      // TODO: satisfies never
      return positionTypeUnit;
  }
};

export const flipPositionType = (
  positionType: PositionType,
  position: Position,
  content: DOMRect,
  frame?: DOMRect,
): PositionType => {
  const [positionTypeFirst, positionTypeSecond] = splitPositionType(
    positionType,
  );

  const newPositionTypeFirst = (() => {
    const shouldFlip = shouldFlipPositionTypeUnit(
      positionTypeFirst,
      position,
      content,
      frame,
    );

    return shouldFlip
      ? flipPositionTypeUnit(positionTypeFirst)
      : positionTypeFirst;
  })();

  if (positionTypeSecond === undefined) return newPositionTypeFirst;

  const newPositionTypeSecond = (() => {
    const flippedPositionTypeSecond = flipPositionTypeUnit(positionTypeSecond);
    const shouldFlip = shouldFlipPositionTypeUnit(
      flippedPositionTypeSecond,
      position,
      content,
      frame,
    );

    return shouldFlip
      ? flipPositionTypeUnit(positionTypeSecond)
      : positionTypeSecond;
  })();

  return newPositionTypeFirst.concat(
    '-',
    newPositionTypeSecond,
  ) as PositionType;
};
