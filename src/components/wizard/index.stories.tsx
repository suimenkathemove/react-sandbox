import { ComponentMeta, ComponentStory } from '@storybook/react';

import { questionTree } from './__mocks__/question-tree';

import { Wizard, WizardProps } from './';

export default {
  title: 'Wizard',
  component: Wizard,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Wizard>;

const Template: ComponentStory<typeof Wizard> = (args) => <Wizard {...args} />;

export const defaultProps: WizardProps = {
  questionTree,
};

export const Default = Template.bind({});
Default.args = defaultProps;
