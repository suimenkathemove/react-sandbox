import { Meta, Story } from "@storybook/react/types-6-0";

import { Card } from "./";

const meta: Meta = { title: "Trello/Card", component: Card };
export default meta;

const Template: Story<React.ComponentProps<typeof Card>> = (args) => (
  <Card {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
  title: "shopping",
};
