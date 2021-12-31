import { FlattenedTreeItem, Node, Tree } from '../../types';

export const buildTree = (flattenedTree: FlattenedTreeItem[]): Tree => {
  const tree: Tree = { id: 'root', children: [] };
  const map: Record<Tree['id'], Tree> & Record<Node['id'], Node> = {
    [tree.id]: tree,
  };

  flattenedTree.forEach((item) => {
    if (item.id === 'root') {
      return;
    }

    const parentId = item.parentId ?? tree.id;
    const parent = map[parentId]!;

    if (!map[item.id]) {
      map[item.id] = {
        id: item.id,
        children: [],
      };
    }
    const node: Node = map[item.id]!;

    parent.children.push(node);
  });

  return map.root;
};
