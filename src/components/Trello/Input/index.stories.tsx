import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Input } from "./";

const meta: Meta = { title: "Trello/Input", component: Input };
export default meta;

const Template: Story<React.ComponentProps<typeof Input>> = (args) => (
  <Input {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Demo: React.VFC = () => {
  const [value, setValue] = useState("");

  type InputProps = React.ComponentProps<typeof Input>;
  const onChange: InputProps["onChange"] = (event) => {
    setValue(event.target.value);
  };

  return <Input value={value} onChange={onChange} />;
};
