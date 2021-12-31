---
to: <%= absPath %>/index.stories.tsx
---
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { <%= componentName %>, <%= componentName %>Props } from './';

export default {
  title: '<%= path %>/<%= componentName %>',
  component: <%= componentName %>,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof <%= componentName %>>;

const Template: ComponentStory<typeof <%= componentName %>> = (args) => <<%= componentName %> {...args} />;

export const defaultProps: <%= componentName %>Props = {};

export const Default = Template.bind({});
Default.args = defaultProps;
