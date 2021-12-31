import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { Handle } from './';

const setup = () => render(<Handle {...defaultProps} />);

describe('Handle', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
