import { Meta, Story } from "@storybook/react/types-6-0";

import { Counter } from "./";

const meta: Meta = { title: "Counter", component: Counter };
export default meta;

const Template: Story<React.ComponentProps<typeof Counter>> = (args) => (
  <Counter {...args} />
);

export const Default = Template.bind({});
Default.args = {};
