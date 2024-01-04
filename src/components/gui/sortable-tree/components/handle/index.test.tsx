import 'jest-styled-components';

import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { Handle } from './';

const setup = () => render(<Handle {...defaultProps} />);

describe('Handle', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
