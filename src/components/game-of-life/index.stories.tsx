import { ComponentMeta, ComponentStory } from '@storybook/react';

import { GameOfLife } from './';

export default {
  title: '/GameOfLife',
  component: GameOfLife,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof GameOfLife>;

const Template: ComponentStory<typeof GameOfLife> = (args) => (
  <GameOfLife {...args} />
);

export const defaultProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
