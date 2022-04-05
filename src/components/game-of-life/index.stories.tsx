import { ComponentMeta, ComponentStory } from '@storybook/react';

import { GameOfLife, GameOfLifeProps } from './';

export default {
  title: '/GameOfLife',
  component: GameOfLife,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof GameOfLife>;

const Template: ComponentStory<typeof GameOfLife> = (args) => <GameOfLife {...args} />;

export const defaultProps: GameOfLifeProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
