export type BorderOrBackground =
  | {
      type: 'border';
      index: number;
    }
  | {
      type: 'bottomBorder';
    }
  | {
      type: 'background';
      index: number;
    };
