import { useCallback, useState } from 'react';

export const useBool = (
  initialValue = false,
): [boolean, VoidFunction, VoidFunction] => {
  const [bool, setBool] = useState(initialValue);

  const on = useCallback(() => {
    return setBool(true);
  }, []);
  const off = useCallback(() => {
    return setBool(false);
  }, []);

  return [bool, on, off];
};
