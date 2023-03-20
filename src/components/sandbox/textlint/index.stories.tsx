import { Meta, StoryObj } from '@storybook/react';

import { TextlintSandbox } from './';

export default {
  component: TextlintSandbox,
} as Meta;

export const Default: StoryObj = {
  render: () => {
    return <TextlintSandbox />;
  },
};
