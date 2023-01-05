import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PageControl, PageControlProps } from './';

export default {
  title: 'ui-components/PageControl',
  component: PageControl,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof PageControl>;

const Template: ComponentStory<typeof PageControl> = (args) => {
  return <PageControl {...args} />;
};

export const defaultProps: PageControlProps = {
  pageCount: 3,
  current: 1,
  gap: 4,
  circleSize: 6,
};

export const Default = Template.bind({});
Default.args = defaultProps;
