import { getCaretWordRange } from './';

import { range } from '@/utils/range';

describe('getCaretWordRange', () => {
  const testText = (text: string) => {
    range(0, 5 + 1).forEach((caretIndex) => {
      test(`caretIndex: ${caretIndex}`, () => {
        const [startIndex, endIndex] = getCaretWordRange(text, caretIndex);
        expect(startIndex).toBe(0);
        expect(endIndex).toBe(5);
      });
    });

    range(6, 12 + 1).forEach((caretIndex) => {
      test(`caretIndex: ${caretIndex}`, () => {
        const [startIndex, endIndex] = getCaretWordRange(text, caretIndex);
        expect(startIndex).toBe(6);
        expect(endIndex).toBe(12);
      });
    });

    range(13, 16 + 1).forEach((caretIndex) => {
      test(`caretIndex: ${caretIndex}`, () => {
        const [startIndex, endIndex] = getCaretWordRange(text, caretIndex);
        expect(startIndex).toBe(13);
        expect(endIndex).toBe(16);
      });
    });
  };

  describe('space-doubleByteSpace', () => {
    const text = 'start middle　end';
    testText(text);
  });

  describe('doubleByteSpace-newline', () => {
    const text = 'start　middle\nend';
    testText(text);
  });

  describe('newline-space', () => {
    const text = 'start\nmiddle end';
    testText(text);
  });
});
