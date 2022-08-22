import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Table, TableProps } from './';

import { range } from '@/utils/range';

export default {
  title: 'Table',
  component: Table,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const defaultProps: TableProps = {
  data: range(100).map((n) => ({ id: n.toString(), name: n.toString() })),
};

export const Default = Template.bind({});
Default.args = defaultProps;
