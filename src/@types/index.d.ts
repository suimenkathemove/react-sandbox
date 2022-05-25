type Fn = (...args: any[]) => any;

type Maybe<T> = T | null;

type OnlyOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? Pick<T, K> & { [P in Exclude<keyof T, K>]?: never }
  : never;

declare module '*.png';
declare module '*.svg';
