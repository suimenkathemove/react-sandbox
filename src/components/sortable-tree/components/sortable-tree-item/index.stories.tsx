import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SortableTreeItem, SortableTreeItemProps } from './';

export default {
  title: 'SortableTree/SortableTreeItem',
  component: SortableTreeItem,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof SortableTreeItem>;

const Template: ComponentStory<typeof SortableTreeItem> = (args) => (
  <SortableTreeItem {...args} />
);

export const defaultProps: SortableTreeItemProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
