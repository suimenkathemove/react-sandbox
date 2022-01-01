import 'jest-styled-components';

import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { SortableTree } from './';

const setup = () => render(<SortableTree {...defaultProps} />);

describe('SortableTree', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
