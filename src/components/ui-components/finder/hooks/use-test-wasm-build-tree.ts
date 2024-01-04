import { useEffect } from 'react';

import { FlattenedTreeItem } from '../types';

export const useTestWasmBuildTree = (flattenedTree: FlattenedTreeItem[]) => {
  useEffect(() => {
    void (async () => {
      const { finder_build_tree } = await import('wasm');

      const tree = finder_build_tree(flattenedTree);
      // eslint-disable-next-line no-console
      console.log(tree);
    })();
  }, [flattenedTree]);
};
