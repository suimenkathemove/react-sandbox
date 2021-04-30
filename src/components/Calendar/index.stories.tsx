import { Story, Meta } from '@storybook/react/types-6-0';
import { Calendar } from './';

const meta: Meta = {
  title: 'Calendar',
  component: Calendar,
};
export default meta;

const Template: Story<React.ComponentProps<typeof Calendar>> = (
  args,
) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {};
