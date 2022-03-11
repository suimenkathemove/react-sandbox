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
      if (item.isDirectory) {
        map[parentId] = {
          id: parentId,
          isLeaf: false,
          children: [],
          collapsed: item.collapsed,
        };
      } else {
        map[parentId] = {
          id: parentId,
          isLeaf: true,
        };
      }
    }
    const parent = map[parentId]!;

    if (!map[item.id]) {
      if (item.isDirectory) {
        map[item.id] = {
          id: item.id,
          isLeaf: false,
          children: [],
          collapsed: item.collapsed,
        };
      } else {
        map[item.id] = {
          id: item.id,
          isLeaf: true,
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
