import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProgressBar, ProgressBarProps } from './';

export default {
  component: ProgressBar,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
);

export const defaultProps: ProgressBarProps = {
  max: 2,
  value: 1,
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const Zero = Template.bind({});
Zero.args = {
  ...defaultProps,
  max: 2,
  value: 0,
};

export const Full = Template.bind({});
Full.args = {
  ...defaultProps,
  max: 2,
  value: 2,
};
