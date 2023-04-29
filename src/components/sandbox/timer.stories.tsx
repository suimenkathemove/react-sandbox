import { Meta, StoryObj } from '@storybook/react';

import { useTimer } from '@/hooks/use-timer';

export default {} as Meta;

const Timer: React.FC = () => {
  const seconds = useTimer();

  return <div>{seconds}</div>;
};

export const Default: StoryObj = {
  render: () => {
    return <Timer />;
  },
};
