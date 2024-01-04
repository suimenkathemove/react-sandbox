import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import 'jest-styled-components';
import { Divider } from './';

const setup = () => render(<Divider {...defaultProps} />);

describe('Divider', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
