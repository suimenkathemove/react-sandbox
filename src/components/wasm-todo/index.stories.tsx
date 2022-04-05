import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WasmTodo, WasmTodoProps } from './';

export default {
  title: 'WasmTodo',
  component: WasmTodo,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof WasmTodo>;

const Template: ComponentStory<typeof WasmTodo> = (args) => (
  <WasmTodo {...args} />
);

export const defaultProps: WasmTodoProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
