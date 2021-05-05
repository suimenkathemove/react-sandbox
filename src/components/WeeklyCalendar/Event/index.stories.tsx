import { setTime } from "@/utils/date/setTime";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Event } from "./";

const meta: Meta = { title: "WeeklyCalendar/Event", component: Event };
export default meta;

const Template: Story<React.ComponentProps<typeof Event>> = (args) => (
  <Event {...args} />
);

const now = new Date();

export const Default = Template.bind({});
Default.args = {
  event: {
    id: 1,
    title: "shopping",
    startDate: setTime(now, 0, 0),
    endDate: setTime(now, 0, 15),
  },
};
