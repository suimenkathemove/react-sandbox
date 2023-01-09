import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Carousel, CarouselProps } from './';

import { range } from '@/utils/range';

export default {
  component: Carousel,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => {
  return <Carousel {...args} />;
};

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

export const Default = Template.bind({});
Default.args = defaultProps;

export const Width100px = Template.bind({});
Width100px.args = { ...defaultProps, width: '100px' };
