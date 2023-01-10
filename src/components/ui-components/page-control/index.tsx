import { memo } from 'react';

import { Circle, Container } from './styles';

import { range } from '@/utils/range';

export type PageControlProps = {
  pageCount: number;
  currentPage: number;
  gap: number;
  circleSize: number;
};

export const PageControl = memo<PageControlProps>((props) => {
  return (
    <Container gap={props.gap}>
      {range(props.pageCount).map((i) => (
        <Circle
          key={i}
          size={props.circleSize}
          color={i === props.currentPage ? 'white' : 'gray'}
        />
      ))}
    </Container>
  );
});
