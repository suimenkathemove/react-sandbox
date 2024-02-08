import {
  FlattenedTreeItem,
  NodeId,
  Tree,
} from '@/components/gui/sortable-tree/types';
import { buildTree } from '@/components/gui/sortable-tree/utils/build-tree';
import { arrayMove } from '@/utils/array-move';

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

export const sortTree = (
  flattenedTree: FlattenedTreeItem[],
  fromItem: FlattenedTreeItem,
  newParentIdOfFromItem: NodeId,
  fromIndex: number,
  toIndex: number,
): Tree => {
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
