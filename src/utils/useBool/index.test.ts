import { act, renderHook } from '@testing-library/react-hooks';

import { useBool } from './';

test('useBool', () => {
  const { result } = renderHook(() => useBool());

  expect(result.current[0]).toBe(false);

  act(() => {
    result.current[1]();
  });
  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[2]();
  });
  expect(result.current[0]).toBe(false);
});
