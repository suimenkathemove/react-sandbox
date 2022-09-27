import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Lovemageddon } from './';

export default {
  title: 'Lovemageddon',
  component: Lovemageddon,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Lovemageddon>;

const Template: ComponentStory<typeof Lovemageddon> = (args) => (
  <Lovemageddon {...args} />
);

export const defaultProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
