import { memo, useState } from 'react';

import { Container, Item, ItemContainer, PageControlContainer } from './styles';

import { PageControl } from '@/components/ui-components/page-control';

export type CarouselProps = {
  children: JSX.Element[];
  width?: string;
};

export const Carousel = memo<CarouselProps>((props) => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((current) => Math.max(current - 1, 0));
  };

  const next = () => {
    setCurrent((current) => Math.min(current + 1, props.children.length - 1));
  };

  return (
    <Container width={props.width ?? '100%'}>
      <ItemContainer>
        {props.children.map((child, i) => (
          <Item key={i} current={current}>
            {child}
          </Item>
        ))}
      </ItemContainer>
      <PageControlContainer>
        <button onClick={prev}>{'<'}</button>
        <PageControl
          pageCount={props.children.length}
          current={current}
          gap={4}
          circleSize={6}
        />
        <button onClick={next}>{'>'}</button>
      </PageControlContainer>
    </Container>
  );
});
