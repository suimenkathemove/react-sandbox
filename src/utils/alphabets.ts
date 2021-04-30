import { range } from "./range";

export const alphabets = range(26).map((i) =>
  String.fromCharCode("a".charCodeAt(0) + i)
);
