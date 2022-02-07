import {
  DndContext,
  DndContextProps,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { SortableTreeItem } from './components/sortable-tree-item';
import {
  SortableTreeSortableItem,
  SortableTreeSortableItemProps,
} from './components/sortable-tree-sortable-item';
import { Ul } from './styles';
import { FlattenedTreeItem, Tree } from './types';
import { buildTree } from './utils/build-tree';
import { flattenTree } from './utils/flatten-tree';
import { getProjection } from './utils/get-projection';
import { removeDescendants } from './utils/remove-descendants';
import { removeItem } from './utils/remove-item';

export type SortableTreeProps = {
  tree: Tree;
};

export const SortableTree: React.VFC<SortableTreeProps> = (props) => {
  const [tree, setTree] = useState(() => props.tree);
  const [activeId, setActiveId] = useState<FlattenedTreeItem['id'] | null>(
    null,
  );
  const [overId, setOverId] = useState<FlattenedTreeItem['id'] | null>(null);
  const [offsetX, setOffsetX] = useState(0);

  const resetState = () => {
    setActiveId(null);
    setOverId(null);
    setOffsetX(0);

    document.body.style.setProperty('cursor', '');
  };

  const flattenedTree = useMemo(() => flattenTree(tree), [tree]);

  const displayedFlattenedTree = useMemo(
    () =>
      activeId ? removeDescendants(flattenedTree, activeId) : flattenedTree,
    [activeId, flattenedTree],
  );

  const projection = useMemo(
    () =>
      activeId && overId
        ? getProjection(displayedFlattenedTree, { activeId, overId }, offsetX)
        : null,
    [activeId, displayedFlattenedTree, offsetX, overId],
  );

  const activeFlattenedTreeItem = useMemo(
    () =>
      activeId
        ? displayedFlattenedTree.find(({ id }) => id === activeId)!
        : null,
    [activeId, displayedFlattenedTree],
  );

  const onDragStart: DndContextProps['onDragStart'] = ({ active: { id } }) => {
    setActiveId(id);
    setOverId(id);

    document.body.style.setProperty('cursor', 'grabbing');
  };

  const onDragMove: DndContextProps['onDragMove'] = ({ delta: { x } }) => {
    setOffsetX(x);
  };

  const onDragOver: DndContextProps['onDragOver'] = ({ over }) => {
    setOverId(over?.id ?? null);
  };

  const onDragEnd: DndContextProps['onDragEnd'] = ({ active, over }) => {
    resetState();

    if (projection && over) {
      const activeIndex = flattenedTree.findIndex(({ id }) => id === active.id);
      const overIndex = flattenedTree.findIndex(({ id }) => id === over.id);

      const { depth, parentId } = projection;

      const copiedFlattenedTree = [...flattenedTree];
      copiedFlattenedTree[activeIndex] = {
        ...copiedFlattenedTree[activeIndex]!,
        depth,
        parentId,
      };
      const sortedFlattenedTree = arrayMove(
        copiedFlattenedTree,
        activeIndex,
        overIndex,
      );
      const newTree = buildTree(sortedFlattenedTree);
      setTree(newTree);
    }
  };

  const onDragCancel: DndContextProps['onDragCancel'] = () => {
    resetState();
  };

  const onRemove: SortableTreeSortableItemProps['onRemove'] = (id) => {
    const newFlattenedTree = removeItem(flattenedTree, id);
    const newTree = buildTree(newFlattenedTree);
    setTree(newTree);
  };

  const sensors = useSensors(useSensor(PointerSensor), useSensor(MouseSensor));

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <SortableContext items={displayedFlattenedTree}>
        <Ul>
          {displayedFlattenedTree.map((item) => (
            <SortableTreeSortableItem
              key={item.id}
              {...item}
              depth={
                item.id === activeId && projection
                  ? projection.depth
                  : item.depth
              }
              onRemove={onRemove}
            />
          ))}
        </Ul>
        {createPortal(
          <DragOverlay>
            {activeFlattenedTreeItem && (
              <SortableTreeItem
                {...activeFlattenedTreeItem}
                clone
                onRemove={onRemove}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </SortableContext>
    </DndContext>
  );
};
