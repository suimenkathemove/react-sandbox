import { Meta, Story } from '@storybook/react';
import { useState } from 'react';

import { DatePicker } from './';

const meta: Meta = {
  component: DatePicker,
};
export default meta;

const Template: Story<React.ComponentProps<typeof DatePicker>> = (args) => (
  <DatePicker {...args} />
);

const now = new Date();

export const Default = Template.bind({});
Default.args = {
  selectedDate: new Date(now.getFullYear(), now.getMonth()),
};

export const Demo: React.VFC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
  );
};
