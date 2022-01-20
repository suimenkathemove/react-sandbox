import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Wizard, WizardProps } from './';

export default {
  title: 'Wizard',
  component: Wizard,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Wizard>;

const Template: ComponentStory<typeof Wizard> = (args) => <Wizard {...args} />;

export const defaultProps: WizardProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
