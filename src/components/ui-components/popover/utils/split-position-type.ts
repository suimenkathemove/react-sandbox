import { PositionType, PositionTypeUnit } from '../models/position-type';

export const splitPositionType = (positionType: PositionType) =>
  positionType.split('-') as [
    positionTypeFirst: PositionTypeUnit,
    positionTypeSecond: PositionTypeUnit | undefined,
  ];
