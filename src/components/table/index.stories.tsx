import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Table, TableProps } from './';

export default {
  title: 'Table',
  component: Table,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const defaultProps: TableProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
