import { useCallback, useState } from 'react';

export const usePersonCount = (
  initialPersonCount: number,
): {
  personCount: number;
  onChangePersonCount: React.ChangeEventHandler<HTMLInputElement>;
} => {
  const [personCount, setPersonCount] = useState(initialPersonCount);

  const onChangePersonCount = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      return;
    }

    setPersonCount(value);
  }, []);

  return { personCount, onChangePersonCount };
};
