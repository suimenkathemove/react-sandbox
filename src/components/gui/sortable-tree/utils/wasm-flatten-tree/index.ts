import { FlattenedTreeItem, Tree } from '../../types';

export const wasmFlattenTree = async (
  tree: Tree,
): Promise<FlattenedTreeItem[]> => {
  const { flatten_tree } = await import('wasm');

  return flatten_tree(tree);
};
