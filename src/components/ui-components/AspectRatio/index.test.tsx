import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { AspectRatio } from './';

const setup = () => render(<AspectRatio {...defaultProps} />);

describe('AspectRatio', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
