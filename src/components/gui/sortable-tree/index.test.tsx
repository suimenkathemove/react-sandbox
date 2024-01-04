/* eslint-disable @typescript-eslint/no-unused-vars */
import 'jest-styled-components';

import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { SortableTree } from './';

const setup = () => render(<SortableTree {...defaultProps} />);

describe('SortableTree', () => {
  test('render', () => {
    // const { asFragment } = setup();
    // expect(asFragment()).toMatchSnapshot();
  });
});
