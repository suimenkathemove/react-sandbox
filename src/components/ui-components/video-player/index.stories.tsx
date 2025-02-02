import type { Meta, StoryObj } from '@storybook/react';

import { CurrentTimeSlider } from './current-time-slider';

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

export const CurrentTimeSliderDefault: Story = {
  render: () => {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <div style={{ padding: 16 }}>
          <CurrentTimeSlider />
        </div>
      </div>
    );
  },
};
