import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { Grid } from './';

const setup = () => render(<Grid {...defaultProps} />);

describe('Grid', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
