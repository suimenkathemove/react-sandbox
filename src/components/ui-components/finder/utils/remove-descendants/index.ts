import { FlattenedTreeItem } from '../../types';

export const removeDescendants = (
  flattenedTree: FlattenedTreeItem[],
  ids: FlattenedTreeItem['id'][],
): FlattenedTreeItem[] => {
  const excludeParentIds = [...ids];

  return flattenedTree.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      excludeParentIds.push(item.id);

      return false;
    }

    return true;
  });
};
