import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SortableTreeSortableItem, SortableTreeSortableItemProps } from './';

export default {
  component: SortableTreeSortableItem,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof SortableTreeSortableItem>;

const Template: ComponentStory<typeof SortableTreeSortableItem> = (args) => (
  <SortableTreeSortableItem {...args} />
);

export const defaultProps: SortableTreeSortableItemProps = {
  id: '1',
  depth: 0,
  onRemove: () => {},
};

export const Default = Template.bind({});
Default.args = defaultProps;
