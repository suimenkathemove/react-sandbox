import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SortableTree, SortableTreeProps } from './';

export default {
  title: 'SortableTree',
  component: SortableTree,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof SortableTree>;

const Template: ComponentStory<typeof SortableTree> = (args) => (
  <SortableTree {...args} />
);

export const defaultProps: SortableTreeProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
