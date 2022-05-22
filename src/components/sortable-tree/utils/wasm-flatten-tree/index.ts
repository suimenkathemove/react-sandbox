import { FlattenedTreeItem, Tree } from '../../types';

export const wasmFlattenTree = async (
  tree: Tree,
): Promise<FlattenedTreeItem[]> => {
  const { Node } = await import('wasm');

  const node = Node.new(tree);

  return node.flatten_tree();
};
