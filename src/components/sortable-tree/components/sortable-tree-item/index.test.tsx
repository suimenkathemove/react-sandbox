import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { SortableTreeItem } from './';

const setup = () => render(<SortableTreeItem {...defaultProps} />);

describe('SortableTreeItem', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
