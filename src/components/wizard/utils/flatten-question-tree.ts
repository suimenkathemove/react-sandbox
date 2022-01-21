import {
  FlattenedQuestionTreeItem,
  QuestionNode,
  QuestionTree,
} from '../types/question';

import { assertNever } from '@/utils/assertNever';

export const flattenQuestionTree = (
  questionTree: QuestionTree,
): FlattenedQuestionTreeItem[] => {
  const flattenedQuestionTree: FlattenedQuestionTreeItem[] = [];

  const flatten = (
    questionNode: QuestionNode,
    parentId: FlattenedQuestionTreeItem['parentId'],
  ) => {
    switch (questionNode.kind) {
      case 'input':
        flattenedQuestionTree.push({
          kind: questionNode.kind,
          id: questionNode.id,
          message: questionNode.message,
          parentId,
        });
        break;
      case 'select':
        flattenedQuestionTree.push({
          kind: questionNode.kind,
          id: questionNode.id,
          message: questionNode.message,
          parentId,
        });

        questionNode.choices.forEach((c) => {
          flatten(c, questionNode.id);
        });
        break;
      case 'select_choice':
        flattenedQuestionTree.push({
          kind: questionNode.kind,
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
