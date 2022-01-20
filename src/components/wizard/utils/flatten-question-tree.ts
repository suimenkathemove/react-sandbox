import {
  FlattenedQuestionTreeItem,
  QuestionNode,
  QuestionTree,
} from '../types';

import { assertNever } from '@/utils/assertNever';

export const flattenQuestionTree = (
  questionTree: QuestionTree,
): FlattenedQuestionTreeItem[] => {
  const flattenedQuestionTree: FlattenedQuestionTreeItem[] = [];

  const flatten = (
    questionNode: QuestionNode,
    parentId: FlattenedQuestionTreeItem['parentId'],
  ) => {
    switch (questionNode.type) {
      case 'input':
        flattenedQuestionTree.push({
          type: questionNode.type,
          id: questionNode.id,
          message: questionNode.message,
          parentId,
        });
        break;
      case 'select':
        flattenedQuestionTree.push({
          type: questionNode.type,
          id: questionNode.id,
          message: questionNode.message,
          parentId,
        });

        questionNode.choices.forEach((c) => {
          flatten(c, questionNode.id);
        });
        break;
      case 'selectChoice':
        flattenedQuestionTree.push({
          type: questionNode.type,
          id: questionNode.id,
          label: questionNode.label,
          parentId,
        });

        questionNode.questions.forEach((q) => {
          flatten(q, questionNode.id);
        });
        break;
      default:
        assertNever(questionNode);
    }
  };
  questionTree.questions.forEach((q) => {
    flatten(q, 'root');
  });

  return flattenedQuestionTree;
};
