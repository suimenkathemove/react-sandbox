import { Meta, Story } from "@storybook/react/types-6-0";
import { Move } from "./";

const meta: Meta = { title: "Move/js", component: Move };
export default meta;

const Template: Story<React.ComponentProps<typeof Move>> = (args) => (
  <Move {...args} />
);

export const Default = Template.bind({});
Default.args = {};
