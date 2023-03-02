import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Grid } from './';

export default {
  component: Grid,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

export const defaultProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
