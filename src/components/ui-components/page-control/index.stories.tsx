import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PageControl, PageControlProps } from './';

export default {
  component: PageControl,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof PageControl>;

const Template: ComponentStory<typeof PageControl> = (args) => {
  return <PageControl {...args} />;
};

export const defaultProps: PageControlProps = {
  pageCount: 3,
  currentPage: 1,
  gap: 4,
  circleSize: 6,
  circleColor: 'white',
  circleActiveColor: 'gray',
};

export const Default = Template.bind({});
Default.args = defaultProps;
