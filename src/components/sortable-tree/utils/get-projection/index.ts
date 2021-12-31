import { arrayMove } from '@dnd-kit/sortable';

import { indentationWidth } from '../../constants';
import { FlattenedTreeItem } from '../../types';

export const getProjection = (
  flattenedTree: FlattenedTreeItem[],
  {
    activeId,
    overId,
  }: { activeId: FlattenedTreeItem['id']; overId: FlattenedTreeItem['id'] },
  offsetX: number,
): Pick<FlattenedTreeItem, 'depth' | 'parentId'> => {
  const activeIndex = flattenedTree.findIndex(({ id }) => id === activeId);
  const overIndex = flattenedTree.findIndex(({ id }) => id === overId);

  const sortedFlattenedTree = arrayMove(flattenedTree, activeIndex, overIndex);

  const prevItem = sortedFlattenedTree[overIndex - 1];
  const nextItem = sortedFlattenedTree[overIndex + 1];

  const depth = (() => {
    const relativeDepth = Math.round(offsetX / indentationWidth);
    const absoluteDepth = flattenedTree[activeIndex]!.depth + relativeDepth;

    const minDepth = nextItem?.depth ?? 0;
    const maxDepth = prevItem?.depth != null ? prevItem.depth + 1 : 0;

    if (absoluteDepth < minDepth) {
      return minDepth;
    }
    if (maxDepth < absoluteDepth) {
      return maxDepth;
    }

    return absoluteDepth;
  })();

  const parentId = (() => {
    if (depth === 0 || !prevItem) {
      return null;
    }

    if (depth === prevItem.depth) {
      return prevItem.parentId;
    }

    if (depth > prevItem.depth) {
      return prevItem.id;
    }

    return (
      sortedFlattenedTree
        .slice(0, overIndex)
        .reverse()
        .find((item) => item.depth === depth)?.parentId ?? null
    );
  })();

  return { depth, parentId };
};
