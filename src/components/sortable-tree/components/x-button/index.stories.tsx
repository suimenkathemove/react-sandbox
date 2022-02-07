import { ComponentMeta, ComponentStory } from '@storybook/react';

import { XButton, XButtonProps } from './';

export default {
  title: 'SortableTree/XButton',
  component: XButton,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof XButton>;

const Template: ComponentStory<typeof XButton> = (args) => (
  <XButton {...args} />
);

export const defaultProps: XButtonProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
