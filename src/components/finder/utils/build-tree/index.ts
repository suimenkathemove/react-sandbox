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
      if (!item.isLeaf) {
        map[parentId] = {
          id: parentId,
          isLeaf: item.isLeaf,
          children: [],
          collapsed: item.collapsed,
        };
      } else {
        map[parentId] = {
          id: parentId,
          isLeaf: item.isLeaf,
        };
      }
    }
    const parent = map[parentId]!;

    if (!map[item.id]) {
      if (!item.isLeaf) {
        map[item.id] = {
          id: item.id,
          isLeaf: item.isLeaf,
          children: [],
          collapsed: item.collapsed,
        };
      } else {
        map[item.id] = {
          id: item.id,
          isLeaf: item.isLeaf,
        };
      }
    }
    const node = map[item.id]!;

    if (!parent.isLeaf) {
      parent.children.push(node);
    }
  });

  return tree;
};
