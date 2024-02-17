import { FlattenedTreeItem, Node, Tree } from '../../types';

export const buildTree = (flattenedTree: FlattenedTreeItem[]): Tree => {
  const tree: Tree = { id: 'root', children: [] };
  const map: Record<Tree['id'], Tree> & Record<Node['id'], Node> = {
    [tree.id]: tree,
  };

  flattenedTree.forEach((item) => {
    const { parentId } = item;
    if (!map[parentId]) {
      map[parentId] = {
        id: parentId,
        children: [],
      };
    }
    const parent = map[parentId]!;

    if (!map[item.id]) {
      map[item.id] = {
        id: item.id,
        children: [],
        collapsed: item.collapsed,
      };
    }
    const node = map[item.id]!;

    parent.children.push(node);
  });

  return tree;
};
