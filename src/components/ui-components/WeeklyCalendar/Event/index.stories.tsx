import { Meta, Story } from '@storybook/react/types-6-0';

import { Event } from './';

import { setTime } from '@/utils/date/setTime';

const meta: Meta = {
  component: Event,
};
export default meta;

const Template: Story<React.ComponentProps<typeof Event>> = (args) => (
  <Event {...args} />
);

const now = new Date();
const startDate = setTime(now, 0, 0);
const endDate = setTime(now, 0, 15);

export const Default = Template.bind({});
Default.args = {
  event: {
    id: 1,
    title: 'shopping',
    startDate,
    endDate,
  },
  dateRage: { startDate, endDate },
};
