import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WasmTodo } from './';

export default {
  title: 'WasmTodo',
  component: WasmTodo,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof WasmTodo>;

const Template: ComponentStory<typeof WasmTodo> = (args) => (
  <WasmTodo {...args} />
);

export const defaultProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
