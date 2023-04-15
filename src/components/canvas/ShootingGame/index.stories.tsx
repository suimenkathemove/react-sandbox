import { Meta, Story } from '@storybook/react/types-6-0';

import { ShootingGame } from './';

const meta: Meta = {
  component: ShootingGame,
};
export default meta;

const Template: Story<React.ComponentProps<typeof ShootingGame>> = (args) => (
  <ShootingGame {...args} />
);

export const Default = Template.bind({});
Default.args = {};
