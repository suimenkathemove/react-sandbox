import { Meta, Story } from "@storybook/react/types-6-0";
import { Tree } from "./";
import { range } from "@/utils/range";

const meta: Meta = { title: "Tree", component: Tree };
export default meta;

const Template: Story<React.ComponentProps<typeof Tree>> = (args) => (
  <Tree {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: [
    ...range(10, 20).map((i) => ({
      id: i + 1,
      parentId: i - 10,
    })),
    ...range(10).map((i) => ({
      id: i + 1,
      parentId: Math.max(i - 1, 0),
    })),
  ],
};
