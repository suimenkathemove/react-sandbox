import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import 'jest-styled-components';
import { ProgressBar } from './';

const setup = () => render(<ProgressBar {...defaultProps} />);

describe('ProgressBar', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
