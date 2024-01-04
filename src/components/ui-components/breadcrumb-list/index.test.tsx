import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import 'jest-styled-components';
import { BreadcrumbList } from './';

const setup = () => render(<BreadcrumbList {...defaultProps} />);

describe('BreadcrumbList', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
