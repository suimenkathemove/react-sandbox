import { useCallback, useMemo, useRef, useState } from 'react';

import { BorderOrBackground, getLastDescendantIndex, sortTree } from './models';

import {
  FlattenedTreeItem,
  NodeId,
  Tree,
} from '@/components/gui/sortable-tree/types';
import { flattenTree } from '@/components/gui/sortable-tree/utils/flatten-tree';
import { findIndex, findLastIndex } from '@/utils/find-index';
import { invariant } from '@/utils/invariant';
import { range } from '@/utils/range';

export interface ContainerProps<ContainerElement extends HTMLElement> {
  onPointerMove: React.PointerEventHandler<ContainerElement>;
  onPointerUp: React.PointerEventHandler<ContainerElement>;
  style: React.CSSProperties;
  ref: React.RefObject<ContainerElement>;
  children: React.ReactNode;
}

interface ItemProps {
  onPointerDown: React.PointerEventHandler;
  style: React.CSSProperties;
  item: FlattenedTreeItem;
  index: number;
  paddingLeft: number;
}

export interface ReactNotionSortableTreeProps<
  ContainerElement extends HTMLElement,
> {
  tree: Tree;
  Container: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ContainerProps<ContainerElement>> &
      React.RefAttributes<ContainerElement>
  >;
  Item: React.FC<ItemProps>;
  itemHeight?: number;
  paddingPerDepth?: number;
  backgroundColor?: string;
  borderHeight?: number;
  borderColor?: string;
}

export const ReactNotionSortableTree = <ContainerElement extends HTMLElement>(
  props: ReactNotionSortableTreeProps<ContainerElement>,
) => {
  const itemHeight = props.itemHeight ?? 28;
  const heightDisplayBorder = itemHeight / 5;
  const paddingPerDepth = props.paddingPerDepth ?? 24;
  const backgroundColor = props.backgroundColor ?? 'blue';
  const borderHeight = props.borderHeight ?? 1;
  const borderOffset = borderHeight / 2;
  const borderColor = props.borderColor ?? 'blue';

  const [tree, setTree] = useState(() => props.tree);

  const flattenedTree = useMemo(() => flattenTree(tree), [tree]);

  const [fromIndex, setFromIndex] = useState<number | null>(null);

  const [borderOrBackground, setBorderOrBackground] =
    useState<BorderOrBackground | null>(null);

  const containerElementRef = useRef<ContainerElement>(null);

  const onPointerDown = useCallback((index: number) => {
    setFromIndex(index);
  }, []);

  const onPointerMove: React.PointerEventHandler<ContainerElement> =
    useCallback(
      (event) => {
        if (fromIndex == null || containerElementRef.current == null) return;

        const movingDistance =
          event.clientY -
          containerElementRef.current.getBoundingClientRect().top;
        const upperItemIndex = findIndex(
          range(flattenedTree.length),
          (index) =>
            itemHeight * index - heightDisplayBorder <= movingDistance &&
            movingDistance <= itemHeight * index + heightDisplayBorder,
        );
        const lastBorder =
          itemHeight * flattenedTree.length - heightDisplayBorder <=
          movingDistance;
        if (upperItemIndex != null) {
          setBorderOrBackground({ type: 'border', index: upperItemIndex });
        } else if (lastBorder) {
          setBorderOrBackground({ type: 'lastBorder' });
        } else {
          const index = Math.floor(movingDistance / itemHeight);
          setBorderOrBackground({ type: 'background', index });
        }
      },
      [flattenedTree.length, fromIndex, heightDisplayBorder, itemHeight],
    );

  const onPointerUp = useCallback(() => {
    setFromIndex(null);
    setBorderOrBackground(null);

    if (fromIndex == null || borderOrBackground == null) return;

    const fromItem = flattenedTree[fromIndex];
    invariant(fromItem != null, 'fromItem should exist');
    const sortTreeWrapper = (newParentIdOfFromItem: NodeId, toIndex: number) =>
      sortTree(
        flattenedTree,
        fromItem,
        newParentIdOfFromItem,
        fromIndex,
        toIndex,
      );

    switch (borderOrBackground.type) {
      case 'border':
        {
          const borderIndex = borderOrBackground.index;
          if (borderIndex === 0) {
            const newTree = sortTreeWrapper('root', borderIndex);
            setTree(newTree);
          } else {
            const upperItem = flattenedTree[borderIndex - 1];
            invariant(upperItem != null, 'upperItem should exist');
            const lowerItem = flattenedTree[borderIndex];
            invariant(lowerItem != null, 'lowerItem should exist');
            const lastDescendantIndex = getLastDescendantIndex(
              flattenedTree,
              fromIndex,
            );
            const directlyLowerBorder = borderIndex === lastDescendantIndex + 1;
            if (directlyLowerBorder) {
              const parentItem = flattenedTree.find(
                (item) => item.id === fromItem.parentId,
              );
              const newTree = sortTreeWrapper(
                parentItem?.parentId ?? 'root',
                lastDescendantIndex,
              );
              setTree(newTree);
            } else {
              const newParentIdOfFromItem =
                lowerItem.depth > upperItem.depth
                  ? lowerItem.parentId
                  : upperItem.parentId;
              const toIndex =
                borderIndex > fromIndex ? borderIndex - 1 : borderIndex;
              const newTree = sortTreeWrapper(newParentIdOfFromItem, toIndex);
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
            const lastDescendantIndex = getLastDescendantIndex(
              flattenedTree,
              fromIndex,
            );
            const directlyLowerBorder = lastIndex === lastDescendantIndex;
            if (directlyLowerBorder) {
              const parentItem = flattenedTree.find(
                (item) => item.id === fromItem.parentId,
              );

              return parentItem?.parentId ?? 'root';
            }

            return lastItem.parentId;
          })();
          const newTree = sortTreeWrapper(newParentIdOfFromItem, lastIndex);
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
          const newTree = sortTreeWrapper(backgroundItem.id, toIndex);
          setTree(newTree);
        }
        break;
      default:
        borderOrBackground satisfies never;
    }
  }, [borderOrBackground, flattenedTree, fromIndex]);

  // TODO: onPointerMove, onPointerUp

  const paddingLeft = useCallback(
    (depth: number): number => paddingPerDepth * depth,
    [paddingPerDepth],
  );

  const borderY = useMemo((): number | null => {
    if (borderOrBackground == null || borderOrBackground.type === 'background')
      return null;
    switch (borderOrBackground.type) {
      case 'border':
        return itemHeight * borderOrBackground.index - borderOffset;
      case 'lastBorder':
        return itemHeight * flattenedTree.length - borderOffset;
      default:
        return borderOrBackground satisfies never;
    }
  }, [borderOffset, borderOrBackground, flattenedTree.length, itemHeight]);

  return (
    <props.Container
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: 'relative',
      }}
      ref={containerElementRef}
    >
      {flattenedTree.map((item, index) => (
        <props.Item
          key={item.id}
          onPointerDown={() => {
            onPointerDown(index);
          }}
          style={{
            height: itemHeight,
            paddingLeft: paddingLeft(item.depth),
            cursor: fromIndex != null ? 'grabbing' : 'grab',
            userSelect: 'none',
            backgroundColor:
              borderOrBackground?.type === 'background' &&
              index === borderOrBackground.index
                ? backgroundColor
                : undefined,
          }}
          item={item}
          index={index}
          paddingLeft={paddingLeft(item.depth)}
        />
      ))}
      {borderY != null && (
        <div
          style={{
            position: 'absolute',
            top: borderY,
            width: '100%',
            height: borderHeight,
            cursor: fromIndex != null ? 'grabbing' : undefined,
            backgroundColor: borderColor,
          }}
        />
      )}
    </props.Container>
  );
};
