import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { GameOfLife } from './';

const setup = () => render(<GameOfLife {...defaultProps} />);

xdescribe('GameOfLife', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
