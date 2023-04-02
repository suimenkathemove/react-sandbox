import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import 'jest-styled-components';
import { ProgressBar } from './';

const setup = () => render(<ProgressBar {...defaultProps} />);

describe('ProgressBar', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
