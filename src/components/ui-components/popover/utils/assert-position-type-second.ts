import { PositionTypeSecond, PositionTypeUnit } from '../models/position-type';

export function assertPositionTypeSecond<T extends PositionTypeUnit>(
  positionTypeFirst: T,
  positionTypeSecond: PositionTypeUnit | undefined,
): asserts positionTypeSecond is PositionTypeSecond<T> | undefined {}
