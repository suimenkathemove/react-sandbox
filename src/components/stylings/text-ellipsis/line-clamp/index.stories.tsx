import { Meta, StoryObj } from '@storybook/react';

import { LineClamp } from './styles';

type LineClampProps = React.ComponentProps<typeof LineClamp>;

export default {
  component: LineClamp,
  args: {
    children: 'Hello, World!',
  },
} satisfies Meta<LineClampProps>;

export const Default: StoryObj<LineClampProps> = {
  render: (props) => {
    return <LineClamp {...props} lineClamp={1} style={{ width: 50 }} />;
  },
};
