import { FlattenedTreeItem, Node } from '../../types';

export const flattenTree = (node: Node): FlattenedTreeItem[] => {
  const flattenedTree: FlattenedTreeItem[] = [];

  const flatten = (
    node: Node,
    parentId: FlattenedTreeItem['parentId'],
    depth = 0,
  ) => {
    flattenedTree.push({
      id: node.id,
      parentId,
      depth,
    });

    node.children.forEach((n) => {
      flatten(n, node.id, depth + 1);
    });
  };
  flatten(node, null);

  return flattenedTree;
};
