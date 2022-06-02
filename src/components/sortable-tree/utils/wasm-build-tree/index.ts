import { FlattenedTreeItem, Tree } from '../../types';

export const wasmBuildTree = async (
  flattenedTree: FlattenedTreeItem[],
): Promise<Tree> => {
  const { build_tree } = await import('wasm');

  return build_tree(flattenedTree);
};
