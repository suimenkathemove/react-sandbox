type QuestionNodeType = 'input' | 'select' | 'selectChoice';
export type ExtractQuestionNodeType<T extends QuestionNodeType> = T;

type QuestionNodeBase<T extends QuestionNodeType> = {
  type: T;
  id: string;
};

export type InputQuestion = QuestionNodeBase<'input'> & {
  message: string;
};

export type SelectChoice = QuestionNodeBase<'selectChoice'> & {
  label: string;
  questions: Question[];
};

export type SelectQuestion = QuestionNodeBase<'select'> & {
  message: string;
  choices: SelectChoice[];
};

export type Question = InputQuestion | SelectQuestion;

export type QuestionNode = Question | SelectChoice;

export type QuestionTree = {
  type: 'root';
  id: 'root';
  questions: Question[];
};

type FlattenedQuestionTreeItemBase = {
  parentId: string;
};

export type InputFlattenedQuestionTreeItem = FlattenedQuestionTreeItemBase &
  InputQuestion;

export type SelectFlattenedQuestionTreeItem = FlattenedQuestionTreeItemBase &
  Omit<SelectQuestion, 'choices'>;

export type SelectChoiceFlattenedQuestionTreeItem = FlattenedQuestionTreeItemBase &
  Omit<SelectChoice, 'questions'>;

export type QuestionFlattenedQuestionTreeItem =
  | InputFlattenedQuestionTreeItem
  | SelectFlattenedQuestionTreeItem;

export type FlattenedQuestionTreeItem =
  | QuestionFlattenedQuestionTreeItem
  | SelectChoiceFlattenedQuestionTreeItem;
