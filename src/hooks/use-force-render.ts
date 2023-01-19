import { useCallback, useState } from 'react';

export const useForceRender = () => {
  const [_, set] = useState(false);
  const forceRender = useCallback(() => {
    set((v) => !v);
  }, []);

  return { forceRender };
};
