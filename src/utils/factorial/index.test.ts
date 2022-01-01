import { factorial } from './';

describe('factorial', () => {
  test('1 => 1', () => {
    expect(factorial(1)).toEqual(1);
  });

  test('2 => 2', () => {
    expect(factorial(2)).toEqual(2);
  });

  test('3 => 6', () => {
    expect(factorial(3)).toEqual(6);
  });

  test('4 => 24', () => {
    expect(factorial(4)).toEqual(24);
  });

  test('5 => 120', () => {
    expect(factorial(5)).toEqual(120);
  });
});
