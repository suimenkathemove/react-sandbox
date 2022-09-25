import { Coordinate } from '@/types/canvas';

export const point = (
  ctx: CanvasRenderingContext2D,
  coordinate: Coordinate,
  radius: number,
): void => {
  ctx.beginPath();
  ctx.arc(coordinate.x, coordinate.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
};
