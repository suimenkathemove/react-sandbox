import { Meta, StoryObj } from '@storybook/react';

export default {} as Meta;

const Sandbox: React.FC = () => {
  return <div></div>;
};

export const Default: StoryObj = {
  render: () => {
    return <Sandbox />;
  },
};
