import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import 'jest-styled-components';
import { Lovemageddon } from './';

const setup = () => render(<Lovemageddon {...defaultProps} />);

describe('Lovemageddon', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
