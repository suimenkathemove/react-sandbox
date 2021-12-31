---
to: <%= absPath %>/index.test.tsx
---
import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { <%= componentName %> } from './';

const setup = () => render(<<%= componentName %> {...defaultProps} />);

describe('<%= componentName %>', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
