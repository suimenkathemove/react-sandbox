import { Meta, Story } from '@storybook/react';

import { MonthlyCalendar } from './';

const meta: Meta = {
  component: MonthlyCalendar,
};
export default meta;

const Template: Story<React.ComponentProps<typeof MonthlyCalendar>> = (
  args,
) => <MonthlyCalendar {...args} />;

export const Default = Template.bind({});
Default.args = {};
