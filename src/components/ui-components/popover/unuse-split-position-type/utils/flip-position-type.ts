import { Position, PositionType } from '../models';

const createShouldFlip = (
  position: Position,
  content: DOMRect,
  mountTarget: DOMRect | null,
  isMountTargetPositionRelative: boolean,
  frame: DOMRect | null,
): Record<'top' | 'bottom' | 'left' | 'right', boolean> => {
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

export const flipPositionType = (
  positionType: PositionType,
  position: Position,
  content: DOMRect,
  mountTarget: DOMRect | null,
  isMountTargetPositionRelative: boolean,
  frame: DOMRect | null,
): PositionType => {
  const shouldFlip = createShouldFlip(
    position,
    content,
    mountTarget,
    isMountTargetPositionRelative,
    frame,
  );
  switch (positionType) {
    case 'top':
      if (shouldFlip.top)
        return shouldFlip.left
          ? 'bottom-left'
          : shouldFlip.right
            ? 'bottom-right'
            : 'bottom';

      return shouldFlip.left
        ? 'top-left'
        : shouldFlip.right
          ? 'top-right'
          : 'top';
    case 'bottom':
      if (shouldFlip.bottom)
        return shouldFlip.left
          ? 'top-left'
          : shouldFlip.right
            ? 'top-right'
            : 'top';

      return shouldFlip.left
        ? 'bottom-left'
        : shouldFlip.right
          ? 'bottom-right'
          : 'bottom';
    case 'left':
      if (shouldFlip.left)
        return shouldFlip.top
          ? 'right-top'
          : shouldFlip.bottom
            ? 'right-bottom'
            : 'right';

      return shouldFlip.top
        ? 'left-top'
        : shouldFlip.bottom
          ? 'left-bottom'
          : 'left';
    case 'right':
      if (shouldFlip.right)
        return shouldFlip.top
          ? 'left-top'
          : shouldFlip.bottom
            ? 'left-bottom'
            : 'left';

      return shouldFlip.top
        ? 'right-top'
        : shouldFlip.bottom
          ? 'right-bottom'
          : 'right';
    case 'top-left':
      if (shouldFlip.top)
        return shouldFlip.right ? 'bottom-right' : 'bottom-left';

      return shouldFlip.right ? 'top-right' : 'top-left';
    case 'top-right':
      if (shouldFlip.top)
        return shouldFlip.left ? 'bottom-left' : 'bottom-right';

      return shouldFlip.left ? 'top-left' : 'top-right';
    case 'bottom-left':
      if (shouldFlip.bottom) return shouldFlip.right ? 'top-right' : 'top-left';

      return shouldFlip.right ? 'bottom-right' : 'bottom-left';
    case 'bottom-right':
      if (shouldFlip.bottom) return shouldFlip.left ? 'top-left' : 'top-right';

      return shouldFlip.left ? 'bottom-left' : 'bottom-right';
    case 'left-top':
      if (shouldFlip.left)
        return shouldFlip.bottom ? 'right-bottom' : 'right-top';

      return shouldFlip.bottom ? 'left-bottom' : 'left-top';
    case 'left-bottom':
      if (shouldFlip.left) return shouldFlip.top ? 'right-top' : 'right-bottom';

      return shouldFlip.top ? 'left-top' : 'left-bottom';
    case 'right-top':
      if (shouldFlip.right)
        return shouldFlip.bottom ? 'left-bottom' : 'left-top';

      return shouldFlip.bottom ? 'right-bottom' : 'right-top';
    case 'right-bottom':
      if (shouldFlip.right) return shouldFlip.top ? 'left-top' : 'left-bottom';

      return shouldFlip.top ? 'right-top' : 'right-bottom';
    default:
      return positionType;
  }
};
