import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Handle, HandleProps } from './';

export default {
  component: Handle,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Handle>;

const Template: ComponentStory<typeof Handle> = (args) => <Handle {...args} />;

export const defaultProps: HandleProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
