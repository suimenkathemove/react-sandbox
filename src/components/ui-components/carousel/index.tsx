import { memo, useState } from 'react';

import { Container, Item, ItemContainer, PageControlContainer } from './styles';

import { PageControl } from '@/components/ui-components/page-control';

export type CarouselProps = {
  children: JSX.Element[];
  width?: string;
};

export const Carousel = memo<CarouselProps>((props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const prev = () => {
    setCurrentPage((p) => Math.max(p - 1, 0));
  };

  const next = () => {
    setCurrentPage((p) => Math.min(p + 1, props.children.length - 1));
  };

  return (
    <Container width={props.width ?? '100%'}>
      <ItemContainer>
        {props.children.map((child, i) => (
          <Item key={i} currentPage={currentPage}>
            {child}
          </Item>
        ))}
      </ItemContainer>
      <PageControlContainer>
        <button onClick={prev} disabled={currentPage === 0}>
          {'<'}
        </button>
        <PageControl
          pageCount={props.children.length}
          currentPage={currentPage}
          gap={4}
          circleSize={6}
          circleColor="white"
          circleActiveColor="gray"
        />
        <button
          onClick={next}
          disabled={currentPage === props.children.length - 1}
        >
          {'>'}
        </button>
      </PageControlContainer>
    </Container>
  );
});
