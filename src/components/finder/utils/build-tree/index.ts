import { FlattenedTreeItem, Node, Tree } from '../../types';

export const buildTree = (flattenedTree: FlattenedTreeItem[]): Tree => {
  const tree: Tree = {
    id: 'root',
    isLeaf: false,
    children: [],
    collapsed: true,
  };
  const map: Record<Tree['id'], Tree> & Record<Node['id'], Node> = {
    [tree.id]: tree,
  };

  flattenedTree.forEach((item) => {
    const { parentId } = item;
    if (!map[parentId]) {
      map[parentId] = {
        id: parentId,
        isLeaf: item.isLeaf,
        children: [],
        collapsed: item.collapsed,
      };
    }
    const parent = map[parentId]!;

    if (!map[item.id]) {
      map[item.id] = {
        id: item.id,
        isLeaf: item.isLeaf,
        children: [],
        collapsed: item.collapsed,
      };
    }
    const node = map[item.id]!;

    if (!parent.isLeaf) {
      parent.children.push(node);
    }
  });

  return tree;
};
