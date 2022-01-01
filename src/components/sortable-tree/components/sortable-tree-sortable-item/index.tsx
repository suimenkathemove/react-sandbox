import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { FlattenedTreeItem } from '../../types';
import { SortableTreeItem } from '../sortable-tree-item';

export type SortableTreeSortableItemProps = Pick<
  FlattenedTreeItem,
  'id' | 'depth'
>;

export const SortableTreeSortableItem: React.VFC<SortableTreeSortableItemProps> = (
  props,
) => {
  const {
    attributes,
    isDragging,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.id,
  });

  return (
    <SortableTreeItem
      {...props}
      setDroppableNodeRef={setDroppableNodeRef}
      setDraggableNodeRef={setDraggableNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      handleProps={{ ...attributes, ...listeners }}
      ghost={isDragging}
    />
  );
};
