const checkDelimiter = (char: string): boolean => /\s/.test(char);

export const getCaretWordRange = (
  text: string,
  caretIndex: number,
): [startIndex: number, endIndex: number] => {
  const startIndex = ((): number => {
    let currentIndex = caretIndex;
    while (currentIndex > 0) {
      const prevChar = text.slice(currentIndex - 1, currentIndex);
      if (checkDelimiter(prevChar)) {
        break;
      }

      currentIndex--;
    }

    return currentIndex;
  })();

  const endIndex = ((): number => {
    let currentIndex = caretIndex;
    while (currentIndex < text.length - 1 + 1) {
      const nextChar = text.slice(currentIndex, currentIndex + 1);
      if (checkDelimiter(nextChar)) {
        break;
      }

      currentIndex++;
    }

    return currentIndex;
  })();

  return [startIndex, endIndex];
};
