import { buildTree } from '@suimenkathemove/utils';

import {
  FlattenedTreeItem,
  Node,
  NodeId,
  Tree,
} from '@/components/gui/sortable-tree/types';
import { flattenTree } from '@/components/gui/sortable-tree/utils/flatten-tree';
import { arrayMove } from '@/utils/array-move';
import { findIndex } from '@/utils/find-index';
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

export const getDescendantIds = (
  flattenedTree: FlattenedTreeItem[],
  targetId: NodeId,
): NodeId[] => {
  const targetIndex = findIndex(flattenedTree, (item) => item.id === targetId);
  invariant(targetIndex != null, 'targetIndex should exist');
  const targetItem = flattenedTree[targetIndex];
  invariant(targetItem != null, 'targetItem should exist');

  const descendantIds: NodeId[] = [targetId];

  for (let i = targetIndex + 1; i < flattenedTree.length; i++) {
    const item = flattenedTree[i];
    invariant(item != null, 'item should exist');
    if (item.depth <= targetItem.depth) break;
    descendantIds.push(item.id);
  }

  return descendantIds;
};

export const getLastDescendantIndex = (
  flattenedTree: FlattenedTreeItem[],
  targetId: NodeId,
): number => {
  const descendantIds = getDescendantIds(flattenedTree, targetId);
  const lastDescendantId = descendantIds[descendantIds.length - 1];
  invariant(lastDescendantId != null, 'lastDescendantId should exist');
  const lastDescendantIndex = findIndex(
    flattenedTree,
    (item) => item.id === lastDescendantId,
  );
  invariant(lastDescendantIndex != null, 'lastDescendantIndex should exist');

  return lastDescendantIndex;
};

export const sortTree = (
  tree: Tree,
  fromItem: FlattenedTreeItem,
  newParentIdOfFromItem: NodeId,
  toId: NodeId,
): Tree => {
  const flattenedTree = flattenTree(tree);

  const descendantIds = getDescendantIds(flattenedTree, fromItem.id);
  if (descendantIds.includes(newParentIdOfFromItem))
    return buildTree(flattenedTree);

  const newFromItem: FlattenedTreeItem = {
    ...fromItem,
    parentId: newParentIdOfFromItem,
  };
  const newFlattenedTree = flattenedTree.map((item) =>
    item.id === newFromItem.id ? newFromItem : item,
  );
  const fromIndex = findIndex(flattenedTree, (item) => item.id === fromItem.id);
  invariant(fromIndex != null, 'fromIndex should exist');
  const toIndex = findIndex(flattenedTree, (item) => item.id === toId);
  invariant(toIndex != null, 'toIndex should exist');
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
