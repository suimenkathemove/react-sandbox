import { FlattenedTreeItem } from '../../types';

export const removeItem = (
  flattenedTree: FlattenedTreeItem[],
  id: FlattenedTreeItem['id'],
): FlattenedTreeItem[] => {
  const excludeParentIds: FlattenedTreeItem['id'][] = [];

  return flattenedTree.filter((item) => {
    if (
      item.id === id ||
      (item.parentId && excludeParentIds.includes(item.parentId))
    ) {
      excludeParentIds.push(item.id);

      return false;
    }

    return true;
  });
};
