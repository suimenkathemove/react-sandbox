import { Button, Text } from '../styles';

export type PageButtonProps = {
  page: number;
  currentPage: number;
  onClickPage: (page: number) => void;
};

export const PageButton: React.VFC<PageButtonProps> = (props) => {
  const onClickPage = () => {
    props.onClickPage(props.page);
  };

  return (
    <Button active={props.page === props.currentPage} onClick={onClickPage}>
      <Text>{props.page}</Text>
    </Button>
  );
};
