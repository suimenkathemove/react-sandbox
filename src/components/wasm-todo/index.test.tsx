import { cleanup, render } from '@testing-library/react';

import { defaultProps } from './index.stories';

import { WasmTodo } from './';

const setup = () => render(<WasmTodo {...defaultProps} />);

describe('WasmTodo', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
