import { Meta, StoryObj } from '@storybook/react';

import { useTimer } from '@/hooks/use-timer';

const Timer: React.FC = () => {
  const seconds = useTimer();

  return <div>{seconds}</div>;
};

export default {
  component: Timer,
} as Meta;

export const Default: StoryObj = {
  render: () => {
    return <Timer />;
  },
};
