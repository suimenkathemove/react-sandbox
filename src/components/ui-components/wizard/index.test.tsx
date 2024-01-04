import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { Wizard } from './';

const setup = () => render(<Wizard {...defaultProps} />);

describe('Wizard', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
