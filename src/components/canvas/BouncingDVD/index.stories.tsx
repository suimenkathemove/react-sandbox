import { Meta, Story } from '@storybook/react';

import { BouncingDVD } from './';

const meta: Meta = { component: BouncingDVD };
export default meta;

const Template: Story<React.ComponentProps<typeof BouncingDVD>> = (args) => (
  <BouncingDVD {...args} />
);

export const Default = Template.bind({});
Default.args = {};
