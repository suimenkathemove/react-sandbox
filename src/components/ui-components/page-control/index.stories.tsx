import { Meta, StoryObj } from '@storybook/react';

import { PageControl, PageControlProps } from './';

export default {
  excludeStories: ['defaultProps'],
} as Meta<PageControlProps>;

export const defaultProps: PageControlProps = {
  pageCount: 3,
  currentPage: 1,
  gap: 4,
  circleSize: 6,
  circleColor: 'white',
  circleActiveColor: 'gray',
};

export const Default: StoryObj = {
  render: () => {
    return <PageControl {...defaultProps} />;
  },
};
