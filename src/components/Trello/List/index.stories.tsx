import { Meta, Story } from '@storybook/react/types-6-0';

import { List } from './';

import { range } from '@/utils/range';

const meta: Meta = { title: 'Trello/List', component: List };
export default meta;

const Template: Story<React.ComponentProps<typeof List>> = (args) => (
  <List {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
  title: 'To do',
  cards: [
    { id: 1, title: 'shopping' },
    { id: 2, title: 'walk' },
  ],
};

export const Overflow = Template.bind({});
Overflow.args = {
  id: 1,
  title: 'To do',
  cards: range(1, 20 + 1).map((i) => ({ id: i, title: i.toString() })),
};
