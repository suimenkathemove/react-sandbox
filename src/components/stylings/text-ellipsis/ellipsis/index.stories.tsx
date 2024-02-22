import type { Meta, StoryObj } from '@storybook/react';

import { Ellipsis } from './styles';

type EllipsisProps = React.ComponentProps<typeof Ellipsis>;

export default {
  component: Ellipsis,
  args: {
    children: 'Hello, World!',
  },
} as Meta<EllipsisProps>;

export const Default: StoryObj<EllipsisProps> = {
  render: (props) => {
    return (
      <Ellipsis {...props} style={{ display: 'inline-block', width: 50 }} />
    );
  },
};
