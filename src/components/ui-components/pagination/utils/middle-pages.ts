import { range } from 'lodash-es';

import { GAP_TO_MIDDLE_PAGES, MIDDLE_PAGES_COUNT_MAX } from '../constants';

const FIRST_PAGE = 1 + GAP_TO_MIDDLE_PAGES;

const GAP_FROM_START_TO_END = MIDDLE_PAGES_COUNT_MAX - 1;

const GAP_TO_CENTER = GAP_FROM_START_TO_END / 2;

export const middlePages = (
  lastPage: number,
  currentPage: number,
): number[] => {
  const [startPage, endPage] = ((): [number, number] => {
    if (lastPage < FIRST_PAGE + GAP_FROM_START_TO_END) {
      const startPage = FIRST_PAGE;
      const endPage = lastPage;

      return [startPage, endPage];
    }

    if (currentPage < FIRST_PAGE + GAP_TO_CENTER) {
      const startPage = FIRST_PAGE;
      const endPage = startPage + GAP_FROM_START_TO_END;

      return [startPage, endPage];
    }

    if (lastPage - GAP_TO_CENTER < currentPage) {
      const endPage = lastPage;
      const startPage = endPage - GAP_FROM_START_TO_END;

      return [startPage, endPage];
    }

    const startPage = currentPage - GAP_TO_CENTER;
    const endPage = currentPage + GAP_TO_CENTER;

    return [startPage, endPage];
  })();

  return range(startPage, endPage + 1);
};
