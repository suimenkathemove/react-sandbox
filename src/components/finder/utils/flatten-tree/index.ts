import { FlattenedTreeItem, Node, Tree } from '../../types';

export const flattenTree = (tree: Tree): FlattenedTreeItem[] => {
  const flattenedTree: FlattenedTreeItem[] = [];

  const flatten = (
    node: Node,
    parentId: FlattenedTreeItem['parentId'],
    depth = 0,
  ) => {
    if (node.isLeaf) {
      flattenedTree.push({
        id: node.id,
        parentId,
        depth,
        isDirectory: false,
      });
    } else {
      flattenedTree.push({
        id: node.id,
        parentId,
        depth,
        isDirectory: true,
        collapsed: node.collapsed,
      });

      node.children.forEach((c) => {
        flatten(c, node.id, depth + 1);
      });
    }
  };
  if (!tree.isLeaf) {
    tree.children.forEach((c) => {
      flatten(c, tree.id);
    });
  }

  return flattenedTree;
};
