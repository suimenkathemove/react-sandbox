import { Meta, Story } from '@storybook/react';

import { Move } from './';

const meta: Meta = {
  component: Move,
};
export default meta;

const Template: Story<React.ComponentProps<typeof Move>> = (args) => (
  <Move {...args} />
);

export const Default = Template.bind({});
Default.args = {};
