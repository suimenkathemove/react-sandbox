import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";
import { DateRangePicker } from "./";

const meta: Meta = {
  title: "DateRangePicker",
  component: DateRangePicker,
};
export default meta;

const Template: Story<React.ComponentProps<typeof DateRangePicker>> = (
  args,
) => <DateRangePicker {...args} />;

const now = new Date();
const startDate = new Date(now.getFullYear(), now.getMonth());
const endDate = new Date(now.getFullYear(), now.getMonth(), 3);

export const Default = Template.bind({});
Default.args = {
  dateRange: [startDate, endDate],
};

export const Demo: React.VFC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  return <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />;
};
