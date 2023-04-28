import { Meta, StoryObj } from '@storybook/react';

import { TransitionText } from './';

export default {
  component: TransitionText,
} as Meta;

export const Default: StoryObj = {
  render: () => {
    return <TransitionText />;
  },
};
