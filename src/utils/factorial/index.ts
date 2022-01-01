// MEMO: 0以下を考慮しない
export const factorial = (n: number): number => {
  if (n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
};
