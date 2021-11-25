import { Story, Meta } from "@storybook/react/types-6-0";
import { AspectRatio } from "./";

const meta: Meta = { title: "AspectRatio", component: AspectRatio };
export default meta;

const Template: Story<React.ComponentProps<typeof AspectRatio>> = (args) => (
  <AspectRatio {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ratio: 3 / 4,
  children: (
    <img
      src="https://picsum.photos/200"
      alt="random"
      style={{ objectFit: "cover" }}
    />
  ),
};
