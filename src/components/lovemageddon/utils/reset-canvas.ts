import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';

export const resetCanvas = (ctx: CanvasRenderingContext2D): void => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};
