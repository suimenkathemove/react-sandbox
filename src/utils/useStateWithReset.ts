import { useCallback, useState } from "react";

export const useStateWithReset = <S>(
  initialState: S,
): [
  state: S,
  setState: React.Dispatch<React.SetStateAction<S>>,
  resetState: VoidFunction,
] => {
  const [state, setState] = useState(initialState);
  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState, resetState];
};
