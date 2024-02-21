import { Meta, StoryObj } from '@storybook/react';

const Sandbox: React.FC = () => {
  return <div></div>;
};

export default {
  component: Sandbox,
} as Meta;

export const Default: StoryObj = {
  render: () => {
    return <Sandbox />;
  },
};
