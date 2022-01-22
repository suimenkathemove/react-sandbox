import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { Wizard } from './';

const setup = () => render(<Wizard {...defaultProps} />);

describe('Wizard', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
