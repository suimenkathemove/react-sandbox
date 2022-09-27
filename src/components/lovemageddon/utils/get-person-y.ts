import { CANVAS_HEIGHT } from '../constants';

export const getPersonY = (personYRatio: number): number =>
  CANVAS_HEIGHT / (3 * personYRatio);
