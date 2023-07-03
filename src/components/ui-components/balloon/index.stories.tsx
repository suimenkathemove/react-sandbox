import type { Meta, StoryObj } from '@storybook/react';

import { Balloon, BalloonProps } from '.';

export default {
  component: Balloon,
  args: {
    children: 'Hello, World!',
  },
} as Meta<BalloonProps>;

export const Default: StoryObj<BalloonProps> = {};
