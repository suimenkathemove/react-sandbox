import { isObject } from '@/utils/isObject';

type RecursiveObj = {
  [key: string]: RecursiveObj | unknown;
};

export const objMap = (
  obj: RecursiveObj,
  fn: (val: unknown, key: keyof typeof obj) => unknown,
): RecursiveObj =>
  Object.keys(obj).reduce((acc, key) => {
    const val = obj[key];

    return { ...acc, [key]: isObject(val) ? objMap(val, fn) : fn(val, key) };
  }, {});

const convertEmptyStringToNullRecursively = (obj: RecursiveObj): RecursiveObj =>
  objMap(obj, (val) => (val === '' ? null : val));

const obj = {
  a: 'a',
  b: '',
  c: {
    a: {
      a: '',
      b: {
        a: 'a',
        b: '',
      },
      c: 'c',
    },
    b: 'b',
    c: '',
  },
};

console.log(convertEmptyStringToNullRecursively(obj));
