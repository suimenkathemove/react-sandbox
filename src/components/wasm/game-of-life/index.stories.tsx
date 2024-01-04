import { Meta, StoryObj } from '@storybook/react';

import { GameOfLife } from './';

export default {
  component: GameOfLife,
  excludeStories: ['defaultProps'],
} satisfies Meta<typeof GameOfLife>;

export const defaultProps = {};

// export const Default: StoryObj = {
//   render: () => {
//     return <GameOfLife />;
//   },
//   parameters: {
//     screenshot: {
//       skip: true,
//     },
//   },
// };
