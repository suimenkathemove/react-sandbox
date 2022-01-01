import { FlattenedTreeItem } from '../../types';

export const removeDescendants = (
  flattenedTree: FlattenedTreeItem[],
  id: FlattenedTreeItem['id'],
): FlattenedTreeItem[] => {
  const excludeParentIds = [id];

  return flattenedTree.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      excludeParentIds.push(item.id);

      return false;
    }

    return true;
  });
};
