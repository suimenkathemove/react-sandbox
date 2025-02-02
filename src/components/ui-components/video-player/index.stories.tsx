import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [progress, setProgress] = useState(0);

    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <div style={{ padding: 16 }}>
          <CurrentTimeSlider value={progress} onChangeValue={setProgress} />
        </div>
      </div>
    );
  },
};
