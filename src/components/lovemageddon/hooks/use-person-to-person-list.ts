import { useCallback, useEffect, useState } from 'react';

import { range } from '@/utils/range';

export const usePersonToPersonList = (
  personCount: number,
): {
  personToPersonList: Maybe<number>[];
  onChangePersonToPersonList: (targetMe: number, newYou: number) => void;
} => {
  const [personToPersonList, setPersonToPersonList] = useState<Maybe<number>[]>(
    range(personCount).map(() => null),
  );

  useEffect(() => {
    setPersonToPersonList(range(personCount).map(() => null));
  }, [personCount]);

  const onChangePersonToPersonList = useCallback(
    (targetMe: number, newYou: number) => {
      setPersonToPersonList((personToPersonList) =>
        personToPersonList.map((you, me) => (me === targetMe ? newYou : you)),
      );
    },
    [],
  );

  return { personToPersonList, onChangePersonToPersonList };
};
