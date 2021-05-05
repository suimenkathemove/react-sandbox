import { setTime } from "@/utils/date/setTime";
import { Story, Meta } from "@storybook/react/types-6-0";
import { WeeklyCalendar } from "./";

const meta: Meta = { title: "WeeklyCalendar", component: WeeklyCalendar };
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
      startDate: setTime(now, 12, 0),
      endDate: setTime(now, 13, 0),
    },
  ],
};
