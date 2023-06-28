import type { Meta, StoryObj } from '@storybook/react';

import { Balloon, BalloonProps } from '.';

export default {
  component: Balloon,
} as Meta<BalloonProps>;

export const Default: StoryObj<BalloonProps> = {
  args: {
    children: 'Hello, World!',
  },
};
