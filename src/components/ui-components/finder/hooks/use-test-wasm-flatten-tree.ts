import { useEffect } from 'react';

import { Tree } from '../types';

export const useTestWasmFlattenTree = (tree: Tree) => {
  useEffect(() => {
    void (async () => {
      const { finder_flatten_tree } = await import('wasm');

      const flattenedTree = finder_flatten_tree(tree);
      // eslint-disable-next-line no-console
      console.log(flattenedTree);
    })();
  }, [tree]);
};
