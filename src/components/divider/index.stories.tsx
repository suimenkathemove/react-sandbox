import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Divider } from './';

export default {
  title: 'Divider',
  component: Divider,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args} />
);

export const defaultProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
