import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import 'jest-styled-components';
import { XButton } from './';

const setup = () => render(<XButton {...defaultProps} />);

describe('XButton', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
