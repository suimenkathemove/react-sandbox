import { range } from "@/utils/range";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Trello } from "./";

const meta: Meta = { title: "Trello", component: Trello };
export default meta;

const Template: Story<React.ComponentProps<typeof Trello>> = (args) => (
  <Trello {...args} />
);

export const Default = Template.bind({});
Default.args = {
  lists: [
    {
      id: 1,
      title: "To do",
      cards: [
        { id: 1, title: "shopping" },
        { id: 2, title: "walk" },
      ],
    },
    { id: 2, title: "Done", cards: [] },
  ],
};

export const Overflow = Template.bind({});
Overflow.args = {
  lists: range(1, 10 + 1).map((i) => ({
    id: i,
    title: i.toString(),
    cards: [],
  })),
};
