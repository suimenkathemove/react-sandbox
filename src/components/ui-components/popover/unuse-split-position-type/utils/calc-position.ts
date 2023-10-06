import { Offset, Position, PositionType } from '../models';

export const OFFSET = 4;

export const calcPosition = (
  trigger: DOMRect,
  content: DOMRect,
  positionType: PositionType,
  offset: Offset | null,
  mountTarget: DOMRect | null,
  isMountTargetPositionRelative: boolean,
): Position => {
  const x = (() => {
    const mountTargetOffsetX = isMountTargetPositionRelative
      ? -(mountTarget?.x ?? 0)
      : 0;
    const baseX = window.scrollX + trigger.x + mountTargetOffsetX;
    switch (positionType) {
      case 'top':
      case 'bottom':
        return baseX + trigger.width / 2 - content.width / 2;
      case 'top-left':
      case 'bottom-left':
        return baseX;
      case 'top-right':
      case 'bottom-right':
        return baseX - (content.width - trigger.width);
      case 'left':
      case 'left-top':
      case 'left-bottom':
        return baseX - OFFSET - content.width;
      case 'right':
      case 'right-top':
      case 'right-bottom':
        return baseX + OFFSET + trigger.width;
      default:
        return positionType;
    }
  })();

  const y = (() => {
    const mountTargetOffsetY = isMountTargetPositionRelative
      ? -(mountTarget?.y ?? 0)
      : 0;
    const baseY = window.scrollY + trigger.y + mountTargetOffsetY;
    switch (positionType) {
      case 'top':
      case 'top-left':
      case 'top-right':
        return baseY - OFFSET - content.height;
      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        return baseY + OFFSET + trigger.height;
      case 'left':
      case 'right':
        return baseY + trigger.height / 2 - content.height / 2;
      case 'left-top':
      case 'right-top':
        return baseY;
      case 'left-bottom':
      case 'right-bottom':
        return baseY - (content.height - trigger.height);
      default:
        return positionType;
    }
  })();

  return { top: y + (offset?.y ?? 0), left: x + (offset?.x ?? 0) };
};
