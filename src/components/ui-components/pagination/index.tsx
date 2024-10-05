import { EllipsisButton } from './components/ellipsis-button';
import { PageButton, PageButtonProps } from './components/page-button';
import { GAP_TO_MIDDLE_PAGES, MIDDLE_PAGES_COUNT_MAX } from './constants';
import { Button, Container } from './styles';
import { middlePages } from './utils/middle-pages';

export type PaginationProps = {
  lastPage: number;
  currentPage: number;
  onClickPage: (page: number) => void;
};

const ALL_PAGES_COUNT_MAX = 1 * 2 + 1 * 2 + MIDDLE_PAGES_COUNT_MAX;
const ELLIPSIS_HIDDEN_MAX_GAP = 1 + GAP_TO_MIDDLE_PAGES + 1;

export const Pagination: React.VFC<PaginationProps> = (props) => {
  const prevDisabled = props.currentPage === 1;
  const nextDisabled = props.currentPage === props.lastPage;

  const iconColor = (disabled: boolean): string =>
    disabled ? 'gray' : 'black';

  const onClickPrev = () => {
    props.onClickPage(Math.max(1, props.currentPage - 1));
  };
  const onClickNext = () => {
    props.onClickPage(Math.min(props.currentPage + 1, props.lastPage));
  };

  const isEllipsisRequired = props.lastPage > ALL_PAGES_COUNT_MAX;
  const isLeftEllipsisShown =
    isEllipsisRequired && props.currentPage > ELLIPSIS_HIDDEN_MAX_GAP;
  const isRightEllipsisShown =
    isEllipsisRequired &&
    props.lastPage - props.currentPage >= ELLIPSIS_HIDDEN_MAX_GAP;

  const commonPageButtonProps: Omit<PageButtonProps, 'page'> = {
    currentPage: props.currentPage,
    onClickPage: props.onClickPage,
  };

  return (
    <Container>
      <Button disabled={prevDisabled} onClick={onClickPrev}>
        <span style={{ color: iconColor(prevDisabled) }}>{'<'}</span>
      </Button>
      <PageButton page={1} {...commonPageButtonProps} />
      {props.lastPage >= 2 && !isLeftEllipsisShown && (
        <PageButton page={2} {...commonPageButtonProps} />
      )}
      {isLeftEllipsisShown && <EllipsisButton />}
      {props.lastPage >= 5 &&
        middlePages(
          props.lastPage - GAP_TO_MIDDLE_PAGES,
          props.currentPage,
        ).map((page) => (
          <PageButton key={page} page={page} {...commonPageButtonProps} />
        ))}
      {isRightEllipsisShown && <EllipsisButton />}
      {props.lastPage >= 4 && !isRightEllipsisShown && (
        <PageButton page={props.lastPage - 1} {...commonPageButtonProps} />
      )}
      {props.lastPage >= 3 && (
        <PageButton page={props.lastPage} {...commonPageButtonProps} />
      )}
      <Button disabled={nextDisabled} onClick={onClickNext}>
        <span style={{ color: iconColor(nextDisabled) }}>{'>'}</span>
      </Button>
    </Container>
  );
};
