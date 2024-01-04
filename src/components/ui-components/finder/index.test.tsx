/* eslint-disable @typescript-eslint/no-unused-vars */
import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import 'jest-styled-components';
import { Finder } from './';

const setup = () => render(<Finder {...defaultProps} />);

describe('Finder', () => {
  test('render', () => {
    // const { asFragment } = setup();
    // expect(asFragment()).toMatchSnapshot();
  });
});
