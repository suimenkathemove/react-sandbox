import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import 'jest-styled-components';
import { Finder } from './';

const setup = () => render(<Finder {...defaultProps} />);

describe('Finder', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
