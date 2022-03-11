import { ComponentMeta, ComponentStory } from '@storybook/react';

import { tree } from './__mocks__/tree';

import { Finder, FinderProps } from './';

export default {
  title: 'Finder',
  component: Finder,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Finder>;

const Template: ComponentStory<typeof Finder> = (args) => <Finder {...args} />;

export const defaultProps: FinderProps = {
  tree,
};

export const Default = Template.bind({});
Default.args = defaultProps;
