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
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 0));
  };

  const next = () => {
    setCurrentPage((currentPage) =>
      Math.min(currentPage + 1, props.children.length - 1),
    );
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
        <button onClick={prev}>{'<'}</button>
        <PageControl
          pageCount={props.children.length}
          currentPage={currentPage}
          gap={4}
          circleSize={6}
          circleColor="white"
          circleActiveColor="gray"
        />
        <button onClick={next}>{'>'}</button>
      </PageControlContainer>
    </Container>
  );
});
