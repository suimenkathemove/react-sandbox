import 'jest-styled-components';

import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { SortableTreeSortableItem } from './';

const setup = () => render(<SortableTreeSortableItem {...defaultProps} />);

describe('SortableTreeSortableItem', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
