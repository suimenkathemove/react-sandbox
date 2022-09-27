import { CANVAS_WIDTH } from '../constants';

export const getPersonX = (personCount: number, personXRatio: number): number =>
  CANVAS_WIDTH / ((personCount + 1) * personXRatio);
