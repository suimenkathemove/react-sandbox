import {
  FlattenedQuestionTreeItem,
  QuestionFlattenedQuestionTreeItem,
  SelectChoiceFlattenedQuestionTreeItem,
} from '../types/question';
import { Slide } from '../types/slide';

import { assertNever } from '@/utils/assertNever';

export const convertToSlide = (
  item: QuestionFlattenedQuestionTreeItem,
  flattenedQuestionTree: FlattenedQuestionTreeItem[],
): Slide => {
  switch (item.kind) {
    case 'input':
      return {
        type: item.kind,
        id: item.id,
        message: item.message,
        value: '',
      };
    case 'select': {
      const choices = flattenedQuestionTree.filter(
        ({ parentId }) => parentId === item.id,
      ) as SelectChoiceFlattenedQuestionTreeItem[];

      return {
        type: item.kind,
        id: item.id,
        message: item.message,
        choices: choices.map(({ id, label }) => ({ id, label })),
        value: null,
      };
    }
    default:
      return assertNever(item);
  }
};
