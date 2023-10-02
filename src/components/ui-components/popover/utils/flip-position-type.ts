import { Position } from '../models';
import { PositionType, PositionTypeUnit } from '../models/position-type';

import { splitPositionType } from './split-position-type';

import { keys } from '@/utils/keys';

const reversePositionTypeUnit = (
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

const createShouldFlip = (
  position: Position,
  content: DOMRect,
  mountTarget: DOMRect | null,
  isMountTargetPositionRelative: boolean,
  frame: DOMRect | null,
): Record<PositionTypeUnit, boolean> => {
  const mountTargetOffsetX = isMountTargetPositionRelative
    ? -(mountTarget?.x ?? 0)
    : 0;
  const mountTargetOffsetY = isMountTargetPositionRelative
    ? -(mountTarget?.y ?? 0)
    : 0;

  const edgeTop = position.top;
  const frameTop = window.scrollY + (frame?.top ?? 0) + mountTargetOffsetY;
  const top = edgeTop < frameTop;

  const edgeBottom = position.top + content.height;
  const frameBottom =
    window.scrollY + (frame?.bottom ?? window.innerHeight) + mountTargetOffsetY;
  const bottom = edgeBottom > frameBottom;

  const edgeLeft = position.left;
  const frameLeft = window.scrollX + (frame?.left ?? 0) + mountTargetOffsetX;
  const left = edgeLeft < frameLeft;

  const edgeRight = position.left + content.width;
  const frameRight =
    window.scrollX + (frame?.right ?? window.innerWidth) + mountTargetOffsetX;
  const right = edgeRight > frameRight;

  return { top, bottom, left, right };
};

type Orientation = 'horizontal' | 'vertical';

const reverseOrientation = (orientation: Orientation): Orientation => {
  switch (orientation) {
    case 'horizontal':
      return 'vertical';
    case 'vertical':
      return 'horizontal';
    default:
      // TODO: satisfies never
      return orientation;
  }
};

const orientationFromPositionTypeUnit = (
  positionTypeUnit: PositionTypeUnit,
): Orientation => {
  switch (positionTypeUnit) {
    case 'top':
    case 'bottom':
      return 'vertical';
    case 'left':
    case 'right':
      return 'horizontal';
    default:
      // TODO: satisfies never
      return positionTypeUnit;
  }
};

const positionTypeUnitFromOrientation: Record<
  Orientation,
  Set<PositionTypeUnit>
> = {
  horizontal: new Set(['left', 'right']),
  vertical: new Set(['top', 'bottom']),
};

export const flipPositionType = (
  positionType: PositionType,
  position: Position,
  content: DOMRect,
  mountTarget: DOMRect | null,
  isMountTargetPositionRelative: boolean,
  frame: DOMRect | null,
): PositionType => {
  const [positionTypeFirst, positionTypeSecond] = splitPositionType(
    positionType,
  );

  const shouldFlip = createShouldFlip(
    position,
    content,
    mountTarget,
    isMountTargetPositionRelative,
    frame,
  );

  const newPositionTypeFirst = shouldFlip[positionTypeFirst]
    ? reversePositionTypeUnit(positionTypeFirst)
    : positionTypeFirst;

  const newPositionTypeSecond = ((): PositionTypeUnit | undefined => {
    if (positionTypeSecond === undefined) {
      const positionTypeFirstOrientation = orientationFromPositionTypeUnit(
        positionTypeFirst,
      );
      const positionTypeSecondOrientation = reverseOrientation(
        positionTypeFirstOrientation,
      );
      const newPositionTypeSeconds = keys(shouldFlip).filter(
        (key) =>
          positionTypeUnitFromOrientation[positionTypeSecondOrientation].has(
            key,
          ) && shouldFlip[key],
      );

      return newPositionTypeSeconds[0];
    }

    return shouldFlip[reversePositionTypeUnit(positionTypeSecond)]
      ? reversePositionTypeUnit(positionTypeSecond)
      : positionTypeSecond;
  })();

  return [newPositionTypeFirst, newPositionTypeSecond]
    .filter(Boolean)
    .join('-') as PositionType;
};
