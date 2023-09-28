import { Offset, Position } from '../models';
import { PositionType } from '../models/position-type';

import { assertPositionTypeSecond } from './assert-position-type-second';
import { splitPositionType } from './split-position-type';

const OFFSET = 4;

export const calcPosition = (
  trigger: DOMRect,
  content: DOMRect,
  positionType: PositionType,
  offset?: Offset,
): Position => {
  const [positionTypeFirst, positionTypeSecond] = splitPositionType(
    positionType,
  );

  const x = (() => {
    const baseX = window.scrollX + trigger.x;
    switch (positionTypeFirst) {
      case 'top':
      case 'bottom':
        assertPositionTypeSecond(positionTypeFirst, positionTypeSecond);
        switch (positionTypeSecond) {
          case 'left':
            return baseX;
          case 'right':
            return baseX - (content.width - trigger.width);
          case undefined:
            return baseX + trigger.width / 2 - content.width / 2;
          default:
            // TODO: satisfies never
            return positionTypeSecond;
        }
      case 'left':
        return baseX - OFFSET - content.width;
      case 'right':
        return baseX + OFFSET + trigger.width;
      default:
        // TODO: satisfies never
        return positionTypeFirst;
    }
  })();

  const y = (() => {
    const baseY = window.scrollY + trigger.y;
    switch (positionTypeFirst) {
      case 'top':
        return baseY - OFFSET - content.height;
      case 'bottom':
        return baseY + OFFSET + trigger.height;
      case 'left':
      case 'right':
        assertPositionTypeSecond(positionTypeFirst, positionTypeSecond);
        switch (positionTypeSecond) {
          case 'top':
            return baseY;
          case 'bottom':
            return baseY - (content.height - trigger.height);
          case undefined:
            return baseY + trigger.height / 2 - content.height / 2;
          default:
            // TODO: satisfies never
            return positionTypeSecond;
        }
      default:
        // TODO: satisfies never
        return positionTypeFirst;
    }
  })();

  return { top: y + (offset?.y ?? 0), left: x + (offset?.x ?? 0) };
};
