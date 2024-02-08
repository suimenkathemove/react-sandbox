import { Meta, StoryObj } from '@storybook/react';

import { SortableTreeLikeNotion, SortableTreeLikeNotionProps } from '.';

import { tree } from '@/components/gui/sortable-tree/__mocks__/tree';

export default {
  component: SortableTreeLikeNotion,
} satisfies Meta<SortableTreeLikeNotionProps>;

export const Default: StoryObj = {
  render: () => {
    return <SortableTreeLikeNotion tree={tree} />;
  },
};
