import { InputQuestion, SelectChoice, SelectQuestion } from './question';

type SlideType = 'input' | 'select' | 'confirm' | 'complete';
export type ExtractSlideType<T extends SlideType> = T;

export type InputSlide = {
  type: ExtractSlideType<'input'>;
  value: string;
} & Pick<InputQuestion, 'id' | 'message'>;

export type SelectSlide = {
  type: ExtractSlideType<'select'>;
  choices: Pick<SelectChoice, 'id' | 'label'>[];
  value: string | null;
} & Pick<SelectQuestion, 'id' | 'message'>;

export type ConfirmSlide = {
  type: ExtractSlideType<'confirm'>;
  id: ExtractSlideType<'confirm'>;
};

export type CompleteSlide = {
  type: ExtractSlideType<'complete'>;
  id: ExtractSlideType<'complete'>;
};

export type Slide = InputSlide | SelectSlide | ConfirmSlide | CompleteSlide;
