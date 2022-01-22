import { useMemo, useState } from 'react';

import {
  FlattenedQuestionTreeItem,
  QuestionFlattenedQuestionTreeItem,
  QuestionTree,
} from './types/question';
import { InputSlide, SelectSlide, Slide } from './types/slide';
import { convertToSlide } from './utils/convert-to-slide';
import { flattenQuestionTree } from './utils/flatten-question-tree';

import { ProgressBar, ProgressBarProps } from '@/components/progress-bar';
import { assertNever } from '@/utils/assertNever';

export type WizardProps = {
  questionTree: QuestionTree;
};

export const Wizard: React.VFC<WizardProps> = (props) => {
  const flattenedQuestionTree = useMemo(
    () => flattenQuestionTree(props.questionTree),
    [props.questionTree],
  );

  const [currentSlideId, setCurrentSlideId] = useState(
    flattenedQuestionTree[0]!.id,
  );

  const progress: Pick<ProgressBarProps, 'max' | 'value'> = useMemo(() => {
    const targetFlattenedQuestionTree = flattenedQuestionTree.filter(
      ({ kind }) => kind !== 'select_choice',
    );
    const max = targetFlattenedQuestionTree.length;
    const value =
      currentSlideId !== 'confirm'
        ? targetFlattenedQuestionTree.findIndex(
            ({ id }) => id === currentSlideId,
          )
        : max;

    return { max, value };
  }, [currentSlideId, flattenedQuestionTree]);

  const [slides, setSlides] = useState<Slide[]>(() => {
    const item = flattenedQuestionTree.find(
      ({ id }) => id === currentSlideId,
    )! as QuestionFlattenedQuestionTreeItem;
    const slide = convertToSlide(item, flattenedQuestionTree);

    return [slide];
  });

  const setValue = (value: string) => {
    setSlides((slides) =>
      slides.map((s) => (s.id === currentSlideId ? { ...s, value } : s)),
    );
  };

  const currentSlide = useMemo(
    () => slides.find(({ id }) => id === currentSlideId)!,
    [currentSlideId, slides],
  );

  const [qAndAList, setQAndAList] = useState<
    { question: string; answer: string }[]
  >([]);

  const nextDisabled =
    (currentSlide.type === 'input' || currentSlide.type === 'select') &&
    !currentSlide.value;

  const nextOnClick = () => {
    const getNextSlide = (
      initialNextItem?: FlattenedQuestionTreeItem,
    ): Slide => {
      const nextItem = (() => {
        let nextItem: FlattenedQuestionTreeItem | null =
          initialNextItem ?? null;
        let currentId: string | null = currentSlideId;
        while (!nextItem && currentId) {
          const currentItem = flattenedQuestionTree.find(
            ({ id }) => id === currentId,
          )!;

          nextItem =
            flattenedQuestionTree.find(
              ({ id, parentId }) =>
                parentId === currentItem.parentId &&
                id !== currentItem.id &&
                slides.every((s) => s.id !== id),
            ) ?? null;

          currentId = (() => {
            const parentItem = flattenedQuestionTree.find(
              ({ id }) => id === currentItem.parentId,
            );

            if (!parentItem) {
              return null;
            }

            return flattenedQuestionTree.find(
              ({ id }) => id === parentItem.parentId,
            )!.id;
          })();
        }

        return nextItem;
      })();

      if (!nextItem) {
        return { type: 'confirm', id: 'confirm' };
      }

      return convertToSlide(
        nextItem as QuestionFlattenedQuestionTreeItem,
        flattenedQuestionTree,
      );
    };

    const nextSlide: Slide | null = (() => {
      switch (currentSlide.type) {
        case 'input':
          return getNextSlide();
        case 'select': {
          const initialNextItem = flattenedQuestionTree.find(
            ({ parentId }) => parentId === currentSlide.value,
          );

          return getNextSlide(initialNextItem);
        }
        case 'confirm':
          return { type: 'complete', id: 'complete' } as const;
        case 'complete':
          return null;
        default:
          return assertNever(currentSlide);
      }
    })();
    if (nextSlide) {
      setSlides((slides) => [...slides, nextSlide]);

      setCurrentSlideId(nextSlide.id);

      if (nextSlide.type === 'confirm') {
        const inputOrSelectSlides = slides.filter(
          ({ type }) => type === 'input' || type === 'select',
        ) as (InputSlide | SelectSlide)[];
        const newQAndAList = inputOrSelectSlides.map((slide) => {
          switch (slide.type) {
            case 'input':
              return { question: slide.message, answer: slide.value };
            case 'select':
              return {
                question: slide.message,
                answer: slide.choices.find(({ id }) => id === slide.value)!
                  .label,
              };
            default:
              return assertNever(slide);
          }
        });
        setQAndAList(newQAndAList);
      }
    }
  };

  const nextHidden = currentSlide.type === 'complete';

  const prevOnClick = () => {
    const currentSlideIndex = slides.findIndex(
      ({ id }) => id === currentSlideId,
    );
    const newSlides = slides.slice(0, currentSlideIndex);

    setSlides(newSlides);

    const newCurrentSlideId = newSlides[newSlides.length - 1]!.id;

    setCurrentSlideId(newCurrentSlideId);
  };

  const prevHidden =
    slides.findIndex(({ id }) => id === currentSlideId) === 0 ||
    currentSlideId === 'complete';

  return (
    <div>
      <ProgressBar {...progress} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={prevOnClick}
          style={{ visibility: prevHidden ? 'hidden' : void 0 }}
        >
          prev
        </button>
        <div style={{ width: 200 }}>
          {(() => {
            switch (currentSlide.type) {
              case 'input':
                return (
                  <div>
                    <p>{currentSlide.message}</p>
                    <input
                      value={currentSlide.value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      style={{ border: '1px solid black' }}
                    />
                  </div>
                );
              case 'select':
                return (
                  <div>
                    <p>{currentSlide.message}</p>
                    {currentSlide.choices.map(({ id, label }) => (
                      <label key={id} style={{ display: 'block' }}>
                        <input
                          type="radio"
                          checked={id === currentSlide.value}
                          onChange={() => {
                            setValue(id);
                          }}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                );
              case 'confirm':
                return (
                  <div>
                    <p>confirm</p>
                    {qAndAList.map(({ question, answer }, index) => (
                      <div key={index}>
                        <span>{question}</span>
                        <span>{answer}</span>
                      </div>
                    ))}
                  </div>
                );
              case 'complete':
                return (
                  <div>
                    <p>complete</p>
                  </div>
                );
              default:
                return assertNever(currentSlide);
            }
          })()}
        </div>
        <button
          disabled={nextDisabled}
          onClick={nextOnClick}
          style={{ visibility: nextHidden ? 'hidden' : void 0 }}
        >
          next
        </button>
      </div>
    </div>
  );
};
