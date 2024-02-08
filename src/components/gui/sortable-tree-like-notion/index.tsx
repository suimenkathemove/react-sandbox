import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { BorderOrBackground, sortTree } from './models';
import { HEIGHT_DISPLAY_BORDER, ITEM_HEIGHT, Li, Ul } from './styles';

import { NodeId, Tree } from '@/components/gui/sortable-tree/types';
import { flattenTree } from '@/components/gui/sortable-tree/utils/flatten-tree';
import { findIndex, findLastIndex } from '@/utils/find-index';
import { invariant } from '@/utils/invariant';
import { range } from '@/utils/range';

export interface SortableTreeLikeNotionProps {
  tree: Tree;
}

export const SortableTreeLikeNotion = memo(
  (props: SortableTreeLikeNotionProps) => {
    const [tree, setTree] = useState(() => props.tree);

    const flattenedTree = useMemo(() => flattenTree(tree), [tree]);

    const [fromIndex, setFromIndex] = useState<number | null>(null);

    const [borderOrBackground, setBorderOrBackground] =
      useState<BorderOrBackground | null>(null);

    const containerElementRef = useRef<HTMLUListElement>(null);

    const onPointerDown = useCallback((index: number) => {
      setFromIndex(index);
    }, []);

    const onPointerMove: React.PointerEventHandler<HTMLUListElement> =
      useCallback(
        (event) => {
          if (fromIndex == null || containerElementRef.current == null) return;

          const movingDistance =
            event.clientY -
            containerElementRef.current.getBoundingClientRect().top;
          const upperItemIndex = findIndex(
            range(flattenedTree.length),
            (index) =>
              ITEM_HEIGHT * index - HEIGHT_DISPLAY_BORDER <= movingDistance &&
              movingDistance <= ITEM_HEIGHT * index + HEIGHT_DISPLAY_BORDER,
          );
          const lastBorder =
            ITEM_HEIGHT * flattenedTree.length - HEIGHT_DISPLAY_BORDER <=
            movingDistance;
          if (upperItemIndex != null) {
            setBorderOrBackground({ type: 'border', index: upperItemIndex });
          } else if (lastBorder) {
            setBorderOrBackground({ type: 'lastBorder' });
          } else {
            const index = Math.floor(movingDistance / ITEM_HEIGHT);
            setBorderOrBackground({ type: 'background', index });
          }
        },
        [flattenedTree.length, fromIndex],
      );

    const onPointerUp = useCallback(() => {
      setFromIndex(null);
      setBorderOrBackground(null);

      invariant(fromIndex != null, 'fromIndex should exist');
      invariant(borderOrBackground != null, 'borderOrBackground should exist');

      const fromItem = flattenedTree[fromIndex];
      invariant(fromItem != null, 'fromItem should exist');

      switch (borderOrBackground.type) {
        case 'border':
          {
            const borderIndex = borderOrBackground.index;
            if (borderIndex === 0) {
              const newTree = sortTree(
                flattenedTree,
                fromItem,
                'root',
                fromIndex,
                borderIndex,
              );
              setTree(newTree);
            } else {
              const upperItem = flattenedTree[borderIndex - 1];
              invariant(upperItem != null, 'upperItem should exist');
              const lowerItem = flattenedTree[borderIndex];
              invariant(lowerItem != null, 'lowerItem should exist');
              if (borderIndex === fromIndex + 1) {
                if (lowerItem.depth >= upperItem.depth) break;
                const parentItem = flattenedTree.find(
                  (item) => item.id === fromItem.parentId,
                );
                const newTree = sortTree(
                  flattenedTree,
                  fromItem,
                  parentItem?.parentId ?? 'root',
                  fromIndex,
                  borderIndex - 1,
                );
                setTree(newTree);
              } else {
                const newParentIdOfFromItem =
                  lowerItem.depth > upperItem.depth
                    ? lowerItem.parentId
                    : upperItem.parentId;
                const newTree = sortTree(
                  flattenedTree,
                  fromItem,
                  newParentIdOfFromItem,
                  fromIndex,
                  borderIndex,
                );
                setTree(newTree);
              }
            }
          }
          break;
        case 'lastBorder':
          {
            const lastIndex = flattenedTree.length - 1;
            const lastItem = flattenedTree[lastIndex];
            invariant(lastItem != null, 'lastItem should exist');
            const newParentIdOfFromItem = ((): NodeId => {
              if (fromIndex === lastIndex) {
                const parentItem = flattenedTree.find(
                  (item) => item.id === lastItem.parentId,
                );

                return parentItem?.parentId ?? 'root';
              }

              return lastItem.parentId;
            })();
            const newTree = sortTree(
              flattenedTree,
              fromItem,
              newParentIdOfFromItem,
              fromIndex,
              lastIndex,
            );
            setTree(newTree);
          }
          break;
        case 'background':
          {
            const backgroundIndex = borderOrBackground.index;
            const backgroundItem = flattenedTree[backgroundIndex];
            invariant(backgroundItem != null, 'backgroundItem should exist');
            const toIndex = ((): number => {
              const siblingLeafIndexInBackgroundItemChildren = findLastIndex(
                flattenedTree,
                (item) => item.parentId === backgroundItem.id,
              );
              if (siblingLeafIndexInBackgroundItemChildren == null) return 0;

              return siblingLeafIndexInBackgroundItemChildren + 1;
            })();
            const newTree = sortTree(
              flattenedTree,
              fromItem,
              backgroundItem.id,
              fromIndex,
              toIndex,
            );
            setTree(newTree);
          }
          break;
        default:
          borderOrBackground satisfies never;
      }
    }, [borderOrBackground, flattenedTree, fromIndex]);

    return (
      <Ul
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        lastBorder={borderOrBackground?.type === 'lastBorder'}
        ref={containerElementRef}
      >
        {flattenedTree.map((item, index) => (
          <Li
            key={item.id}
            onPointerDown={() => {
              onPointerDown(index);
            }}
            depth={item.depth}
            border={
              borderOrBackground?.type === 'border' &&
              index === borderOrBackground.index
            }
            background={
              borderOrBackground?.type === 'background' &&
              index === borderOrBackground.index
            }
          >
            {item.id}
          </Li>
        ))}
      </Ul>
    );
  },
);
