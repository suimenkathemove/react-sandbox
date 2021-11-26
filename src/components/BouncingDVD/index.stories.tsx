import { Meta, Story } from "@storybook/react/types-6-0";

import { BouncingDVD } from "./";

const meta: Meta = { title: "BouncingDVD", component: BouncingDVD };
export default meta;

const Template: Story<React.ComponentProps<typeof BouncingDVD>> = (args) => (
  <BouncingDVD {...args} />
);

export const Default = Template.bind({});
Default.args = {};
