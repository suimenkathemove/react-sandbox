import type { Meta, StoryObj } from '@storybook/react';

import { VideoPlayer } from '.';

const meta = {
  component: VideoPlayer,
  tags: ['autodocs'],
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
