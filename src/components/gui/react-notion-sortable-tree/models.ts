import {
  FlattenedTreeItem,
  Node,
  NodeId,
  Tree,
} from '@/components/gui/sortable-tree/types';
import { buildTree } from '@/components/gui/sortable-tree/utils/build-tree';
import { arrayMove } from '@/utils/array-move';
import { invariant } from '@/utils/invariant';

export type BorderOrBackground =
  | {
      type: 'border';
      index: number;
    }
  | {
      type: 'lastBorder';
    }
  | {
      type: 'background';
      index: number;
    };

export const getLastDescendantIndex = (
  flattenedTree: FlattenedTreeItem[],
  fromIndex: number,
): number => {
  const fromItem = flattenedTree[fromIndex];
  invariant(fromItem != null, 'fromItem should exist');

  let lastDescendantIndex = fromIndex;

  for (let i = fromIndex + 1; i < flattenedTree.length; i++) {
    const item = flattenedTree[i];
    invariant(item != null, 'item should exist');

    if (item.depth <= fromItem.depth) break;

    lastDescendantIndex = i;
  }

  return lastDescendantIndex;
};

const getDescendantIds = (
  flattenedTree: FlattenedTreeItem[],
  fromItem: FlattenedTreeItem,
  fromIndex: number,
): NodeId[] => {
  const descendantIds: NodeId[] = [fromItem.id];
  for (let i = fromIndex + 1; i < flattenedTree.length; i++) {
    const item = flattenedTree[i];
    invariant(item != null, 'item should exist');
    if (item.depth <= fromItem.depth) break;
    descendantIds.push(item.id);
  }

  return descendantIds;
};

export const sortTree = (
  flattenedTree: FlattenedTreeItem[],
  fromItem: FlattenedTreeItem,
  newParentIdOfFromItem: NodeId,
  fromIndex: number,
  toIndex: number,
): Tree => {
  const descendantIds = getDescendantIds(flattenedTree, fromItem, fromIndex);
  if (descendantIds.includes(newParentIdOfFromItem))
    return buildTree(flattenedTree);

  const newFromItem: FlattenedTreeItem = {
    ...fromItem,
    parentId: newParentIdOfFromItem,
  };
  const newFlattenedTree = flattenedTree.map((item) =>
    item.id === newFromItem.id ? newFromItem : item,
  );
  const sortedFlattenedTree = arrayMove(newFlattenedTree, fromIndex, toIndex);

  return buildTree(sortedFlattenedTree);
};

export const collapseFlattenTree = (tree: Tree): FlattenedTreeItem[] => {
  const flattenedTree: FlattenedTreeItem[] = [];

  const flatten = (
    node: Node,
    parentId: FlattenedTreeItem['parentId'],
    depth = 0,
  ): void => {
    flattenedTree.push({
      id: node.id,
      parentId,
      depth,
      collapsed: node.collapsed,
    });

    if (node.collapsed) return;

    node.children.forEach((c) => {
      flatten(c, node.id, depth + 1);
    });
  };
  tree.children.forEach((c) => {
    flatten(c, tree.id);
  });

  return flattenedTree;
};
