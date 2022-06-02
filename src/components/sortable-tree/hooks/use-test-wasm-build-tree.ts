import { useEffect } from 'react';

import { FlattenedTreeItem } from '../types';
import { wasmBuildTree } from '../utils/wasm-build-tree';

export const useTestWasmBuildTree = (flattenedTree: FlattenedTreeItem[]) => {
  useEffect(() => {
    (async () => {
      const tree = await wasmBuildTree(flattenedTree);
      // eslint-disable-next-line no-console
      console.log(tree);
    })();
  }, [flattenedTree]);
};
