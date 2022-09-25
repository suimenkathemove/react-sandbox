import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Lovemageddon, LovemageddonProps } from './';

export default {
  title: 'Lovemageddon',
  component: Lovemageddon,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Lovemageddon>;

const Template: ComponentStory<typeof Lovemageddon> = (args) => (
  <Lovemageddon {...args} />
);

export const defaultProps: LovemageddonProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
