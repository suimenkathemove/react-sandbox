import { Coordinate } from '@/types/canvas';

export const line = (
  ctx: CanvasRenderingContext2D,
  start: Coordinate,
  end: Coordinate,
): void => {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};
