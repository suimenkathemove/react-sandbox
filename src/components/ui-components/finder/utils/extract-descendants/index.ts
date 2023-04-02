import { FlattenedTreeItem } from '../../types';

export const extractDescendants = (
  flattenedTree: FlattenedTreeItem[],
  id: FlattenedTreeItem['id'],
): FlattenedTreeItem[] => {
  const includeParentIds = [id];

  return flattenedTree.filter((item) => {
    if (item.parentId && includeParentIds.includes(item.parentId)) {
      includeParentIds.push(item.id);

      return true;
    }

    return false;
  });
};
