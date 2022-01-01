import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { SortableTreeSortableItem } from './';

const setup = () => render(<SortableTreeSortableItem {...defaultProps} />);

describe('SortableTreeSortableItem', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
