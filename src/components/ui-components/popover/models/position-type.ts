export type PositionTypeUnit = 'top' | 'bottom' | 'left' | 'right';

type ExtractPositionTypeUnit<T extends PositionTypeUnit> = T;

type HorizontalPositionTypeUnit = ExtractPositionTypeUnit<'left' | 'right'>;
type VerticalPositionTypeUnit = ExtractPositionTypeUnit<'top' | 'bottom'>;

export type PositionTypeSecond<
  PositionTypeFirst extends PositionTypeUnit
> = PositionTypeFirst extends HorizontalPositionTypeUnit
  ? VerticalPositionTypeUnit
  : PositionTypeFirst extends VerticalPositionTypeUnit
  ? HorizontalPositionTypeUnit
  : never;

type CornerPositionType<T extends PositionTypeUnit> = T extends PositionTypeUnit
  ? `${T}-${PositionTypeSecond<T>}`
  : never;

export type PositionType =
  | PositionTypeUnit
  | CornerPositionType<PositionTypeUnit>;
