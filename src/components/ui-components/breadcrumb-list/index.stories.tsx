import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BreadcrumbList, BreadcrumbListProps } from './';

export default {
  component: BreadcrumbList,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof BreadcrumbList>;

const Template: ComponentStory<typeof BreadcrumbList> = (args) => (
  <BreadcrumbList {...args} />
);

export const defaultProps: BreadcrumbListProps = {
  ancestors: [{ name: '1' }, { name: '2' }],
  currentName: '3',
};

export const Default = Template.bind({});
Default.args = defaultProps;
