import { Meta, Story } from '@storybook/react';

import { WeeklyCalendar } from './';

import { setTime } from '@/utils/date/setTime';

const meta: Meta = {
  component: WeeklyCalendar,
};
export default meta;

const Template: Story<React.ComponentProps<typeof WeeklyCalendar>> = (args) => (
  <WeeklyCalendar {...args} />
);

const now = new Date();

export const Default = Template.bind({});
Default.args = {
  events: [
    {
      id: 1,
      title: 'shopping',
      startDate: setTime(now, 12, 0),
      endDate: setTime(now, 13, 0),
    },
  ],
};
