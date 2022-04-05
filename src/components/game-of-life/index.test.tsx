import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { GameOfLife } from './';

const setup = () => render(<GameOfLife {...defaultProps} />);

describe('GameOfLife', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
