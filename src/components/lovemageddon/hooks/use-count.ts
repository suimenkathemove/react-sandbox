import { useCallback, useState } from 'react';

export const useCount = (
  initialCount: number,
): {
  count: number;
  onChangeCount: React.ChangeEventHandler<HTMLInputElement>;
} => {
  const [count, setCount] = useState(initialCount);

  const onChangeCount = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = Number(e.target.value);

      if (isNaN(value)) {
        return;
      }

      setCount(value);
    },
    [],
  );

  return { count, onChangeCount };
};
