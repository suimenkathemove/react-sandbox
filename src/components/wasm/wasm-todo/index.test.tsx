import { render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { WasmTodo } from './';

const setup = () => render(<WasmTodo {...defaultProps} />);

describe('WasmTodo', () => {
  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
