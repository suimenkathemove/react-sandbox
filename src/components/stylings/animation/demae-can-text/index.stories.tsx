import { Meta, StoryObj } from '@storybook/react';

import { DemaeCanText } from './';

export default {
  component: DemaeCanText,
} as Meta;

export const Default: StoryObj = {
  render: () => {
    return <DemaeCanText />;
  },
};
