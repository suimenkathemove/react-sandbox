import 'jest-styled-components';

import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { SortableTreeItem } from './';

const setup = () => render(<SortableTreeItem {...defaultProps} />);

describe('SortableTreeItem', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
