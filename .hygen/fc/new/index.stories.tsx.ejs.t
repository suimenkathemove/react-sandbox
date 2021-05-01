---
to: <%= abs_path %>/index.stories.tsx
---
import { Story, Meta } from '@storybook/react/types-6-0';
import { <%= component_name %> } from './';

const meta: Meta = { title: '<%= component_name %>', component: <%= component_name %> };
export default meta;

const Template: Story<React.ComponentProps<typeof <%= component_name %>>> = (args) => (
  <<%= component_name %> {...args} />
);

export const Default = Template.bind({});
Default.args = {
};
