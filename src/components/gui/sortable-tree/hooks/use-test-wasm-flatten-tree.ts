import { useEffect } from 'react';

import { Tree } from '../types';
import { wasmFlattenTree } from '../utils/wasm-flatten-tree';

export const useTestWasmFlattenTree = (tree: Tree) => {
  useEffect(() => {
    void (async () => {
      const flattenedTree = await wasmFlattenTree(tree);
      // eslint-disable-next-line no-console
      console.log(flattenedTree);
    })();
  }, [tree]);
};
