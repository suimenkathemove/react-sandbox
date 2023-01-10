import { Meta, StoryObj } from '@storybook/react';

import { Carousel, CarouselProps } from './';

import { range } from '@/utils/range';

export default {
  component: Carousel,
  excludeStories: ['defaultProps'],
} as Meta<CarouselProps>;

export const defaultProps: CarouselProps = {
  children: range(5).map((i) => (
    <div
      key={i}
      style={{
        height: 100,
        backgroundColor: i % 2 === 0 ? 'red' : 'green',
      }}
    >
      {i}
    </div>
  )),
};

export const Default: StoryObj = {
  render: () => {
    return <Carousel {...defaultProps} />;
  },
};

export const Width100px: StoryObj = {
  render: () => {
    return <Carousel {...defaultProps} width="100px" />;
  },
};
