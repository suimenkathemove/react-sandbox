import {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import {
  BorderOrBackground,
  collapseFlattenTree,
  getLastDescendantIndex,
  sortTree,
} from './models';

import {
  FlattenedTreeItem,
  NodeId,
  Tree,
} from '@/components/gui/sortable-tree/types';
import { buildTree } from '@/components/gui/sortable-tree/utils/build-tree';
import { flattenTree } from '@/components/gui/sortable-tree/utils/flatten-tree';
import { findIndex, findLastIndex } from '@/utils/find-index';
import { invariant } from '@/utils/invariant';
import { range } from '@/utils/range';

interface Coordinate {
  x: number;
  y: number;
}

export interface ContainerProps<ContainerElement extends HTMLElement> {
  style: React.CSSProperties;
  ref: React.RefObject<ContainerElement>;
  children: React.ReactNode;
}

export interface ItemProps<ItemElement extends HTMLElement> {
  onPointerDown: React.PointerEventHandler<ItemElement>;
  style: React.CSSProperties;
  item: FlattenedTreeItem;
  paddingLeft: number;
  onCollapse: () => void;
  ref: React.RefObject<ItemElement>;
}

export interface ReactNotionSortableTreeProps<
  ContainerElement extends HTMLElement,
  ItemElement extends HTMLElement,
> {
  tree: Tree;
  Container: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ContainerProps<ContainerElement>> &
      React.RefAttributes<ContainerElement>
  >;
  Item: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ItemProps<ItemElement>> &
      React.RefAttributes<ItemElement>
  >;
  itemHeight?: number;
  paddingPerDepth?: number;
  backgroundColor?: string;
  borderHeight?: number;
  borderColor?: string;
}

export const ReactNotionSortableTree = <
  ContainerElement extends HTMLElement,
  ItemElement extends HTMLElement,
>(
  props: ReactNotionSortableTreeProps<ContainerElement, ItemElement>,
) => {
  const itemHeight = props.itemHeight ?? 28;
  const heightDisplayBorder = itemHeight / 5;
  const paddingPerDepth = props.paddingPerDepth ?? 24;
  const backgroundColor = props.backgroundColor ?? 'blue';
  const borderHeight = props.borderHeight ?? 1;
  const borderOffset = borderHeight / 2;
  const borderColor = props.borderColor ?? 'blue';

  const [tree, setTree] = useState(() => props.tree);
  const collapsedFlattenedTree = useMemo(
    () => collapseFlattenTree(tree),
    [tree],
  );

  const [fromItem, setFromItem] = useState<FlattenedTreeItem | null>(null);

  const [borderOrBackground, setBorderOrBackground] =
    useState<BorderOrBackground | null>(null);

  const containerElementRef = useRef<ContainerElement>(null);
  const itemElementRefMap = useRef<Map<NodeId, React.RefObject<ItemElement>>>(
    new Map(),
  );
  // TODO: useIsomorphicLayoutEffect
  useLayoutEffect(() => {
    collapsedFlattenedTree.forEach((item) => {
      itemElementRefMap.current.set(item.id, createRef());
    });
  }, [collapsedFlattenedTree]);

  const pointerStartPositionRef = useRef<Coordinate | null>(null);
  const [pointerMovingDistance, setPointerMovingDistance] =
    useState<Coordinate | null>(null);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<ItemElement>, item: FlattenedTreeItem) => {
      setFromItem(item);

      pointerStartPositionRef.current = { x: event.clientX, y: event.clientY };
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (
        fromItem == null ||
        containerElementRef.current == null ||
        pointerStartPositionRef.current == null
      )
        return;

      const movingDistance =
        event.clientY - containerElementRef.current.getBoundingClientRect().top;
      const upperItemIndex = findIndex(
        range(collapsedFlattenedTree.length),
        (index) =>
          itemHeight * index - heightDisplayBorder <= movingDistance &&
          movingDistance <= itemHeight * index + heightDisplayBorder,
      );
      const lastBorder =
        itemHeight * collapsedFlattenedTree.length - heightDisplayBorder <=
        movingDistance;
      if (upperItemIndex != null) {
        setBorderOrBackground({ type: 'border', index: upperItemIndex });
      } else if (lastBorder) {
        setBorderOrBackground({ type: 'lastBorder' });
      } else {
        const index = Math.floor(movingDistance / itemHeight);
        setBorderOrBackground({ type: 'background', index });
      }

      setPointerMovingDistance({
        x: event.clientX - pointerStartPositionRef.current.x,
        y: event.clientY - pointerStartPositionRef.current.y,
      });
    },
    [collapsedFlattenedTree.length, fromItem, heightDisplayBorder, itemHeight],
  );

  const onPointerUp = useCallback(() => {
    setFromItem(null);
    setBorderOrBackground(null);

    pointerStartPositionRef.current = null;
    setPointerMovingDistance(null);

    if (fromItem == null || borderOrBackground == null) return;

    const sortTreeWrapper = (newParentIdOfFromItem: NodeId, toId: NodeId) =>
      sortTree(tree, fromItem, newParentIdOfFromItem, toId);

    switch (borderOrBackground.type) {
      case 'border':
        {
          const borderIndex = borderOrBackground.index;
          if (borderIndex === 0) {
            const toItem = collapsedFlattenedTree[borderIndex];
            invariant(toItem != null, 'toItem should exist');
            const newTree = sortTreeWrapper('root', toItem.id);
            setTree(newTree);
          } else {
            const upperItem = collapsedFlattenedTree[borderIndex - 1];
            invariant(upperItem != null, 'upperItem should exist');
            const lowerItem = collapsedFlattenedTree[borderIndex];
            invariant(lowerItem != null, 'lowerItem should exist');
            const lastDescendantIndex = getLastDescendantIndex(
              collapsedFlattenedTree,
              fromItem.id,
            );
            const directlyLowerBorder = borderIndex === lastDescendantIndex + 1;
            if (directlyLowerBorder) {
              const parentItem = collapsedFlattenedTree.find(
                (item) => item.id === fromItem.parentId,
              );
              const toItem = collapsedFlattenedTree[lastDescendantIndex];
              invariant(toItem != null, 'toItem should exist');
              const newTree = sortTreeWrapper(
                parentItem?.parentId ?? 'root',
                toItem.id,
              );
              setTree(newTree);
            } else {
              const newParentIdOfFromItem =
                lowerItem.depth > upperItem.depth
                  ? lowerItem.parentId
                  : upperItem.parentId;
              const fromIndex = findIndex(
                collapsedFlattenedTree,
                (item) => item.id === fromItem.id,
              );
              invariant(fromIndex != null, 'fromIndex should exist');
              const toIndex =
                borderIndex > fromIndex ? borderIndex - 1 : borderIndex;
              const toItem = collapsedFlattenedTree[toIndex];
              invariant(toItem != null, 'toItem should exist');
              const newTree = sortTreeWrapper(newParentIdOfFromItem, toItem.id);
              setTree(newTree);
            }
          }
        }
        break;
      case 'lastBorder':
        {
          const lastIndex = collapsedFlattenedTree.length - 1;
          const lastItem = collapsedFlattenedTree[lastIndex];
          invariant(lastItem != null, 'lastItem should exist');
          const newParentIdOfFromItem = ((): NodeId => {
            const lastDescendantIndex = getLastDescendantIndex(
              collapsedFlattenedTree,
              fromItem.id,
            );
            const directlyLowerBorder = lastIndex === lastDescendantIndex;
            if (directlyLowerBorder) {
              const parentItem = collapsedFlattenedTree.find(
                (item) => item.id === fromItem.parentId,
              );

              return parentItem?.parentId ?? 'root';
            }

            return lastItem.parentId;
          })();
          const toItem = collapsedFlattenedTree[lastIndex];
          invariant(toItem != null, 'toItem should exist');
          const newTree = sortTreeWrapper(newParentIdOfFromItem, toItem.id);
          setTree(newTree);
        }
        break;
      case 'background':
        {
          const backgroundIndex = borderOrBackground.index;
          const backgroundItem = collapsedFlattenedTree[backgroundIndex];
          invariant(backgroundItem != null, 'backgroundItem should exist');
          const toIndex = ((): number => {
            const siblingLeafIndexInBackgroundItemChildren = findLastIndex(
              collapsedFlattenedTree,
              (item) => item.parentId === backgroundItem.id,
            );
            if (siblingLeafIndexInBackgroundItemChildren == null) return 0;

            return siblingLeafIndexInBackgroundItemChildren + 1;
          })();
          const toItem = collapsedFlattenedTree[toIndex];
          invariant(toItem != null, 'toItem should exist');
          const newTree = sortTreeWrapper(backgroundItem.id, toItem.id);
          setTree(newTree);
        }
        break;
      default:
        borderOrBackground satisfies never;
    }
  }, [borderOrBackground, collapsedFlattenedTree, fromItem, tree]);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

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
        return itemHeight * collapsedFlattenedTree.length - borderOffset;
      default:
        return borderOrBackground satisfies never;
    }
  }, [
    borderOffset,
    borderOrBackground,
    collapsedFlattenedTree.length,
    itemHeight,
  ]);

  const ghostMovingDistance = useMemo((): Coordinate | null => {
    if (fromItem == null || pointerMovingDistance == null) return null;
    const fromElement = itemElementRefMap.current.get(fromItem.id)?.current;
    invariant(fromElement != null, 'fromElement should exist');
    const fromRect = fromElement.getBoundingClientRect();

    return {
      x: fromRect.x + pointerMovingDistance.x,
      y: fromRect.y + pointerMovingDistance.y,
    };
  }, [fromItem, pointerMovingDistance]);

  const onCollapse = useCallback(
    (id: NodeId) => {
      const flattenedTree = flattenTree(tree);
      const item = flattenedTree.find((item) => item.id === id);
      invariant(item != null, 'item should exist');
      const newItem: FlattenedTreeItem = {
        ...item,
        collapsed: !item.collapsed,
      };
      const newFlattenedTree = flattenedTree.map((item) =>
        item.id === newItem.id ? newItem : item,
      );
      const newTree = buildTree(newFlattenedTree);
      setTree(newTree);
    },
    [tree],
  );

  return (
    <>
      <props.Container
        style={{
          position: 'relative',
        }}
        ref={containerElementRef}
      >
        {collapsedFlattenedTree.map((item, index) => (
          <props.Item
            key={item.id}
            onPointerDown={(event) => {
              onPointerDown(event, item);
            }}
            style={{
              height: itemHeight,
              paddingLeft: paddingLeft(item.depth),
              userSelect: 'none',
              backgroundColor:
                borderOrBackground?.type === 'background' &&
                index === borderOrBackground.index
                  ? backgroundColor
                  : undefined,
            }}
            item={item}
            paddingLeft={paddingLeft(item.depth)}
            onCollapse={() => {
              onCollapse(item.id);
            }}
            ref={itemElementRefMap.current.get(item.id)}
          />
        ))}
        {borderY != null && (
          <div
            style={{
              position: 'absolute',
              top: borderY,
              width: '100%',
              height: borderHeight,
              backgroundColor: borderColor,
            }}
          />
        )}
      </props.Container>
      {fromItem != null &&
        ghostMovingDistance != null &&
        createPortal(
          <props.Item
            onPointerDown={() => {}}
            style={{
              position: 'absolute',
              top: ghostMovingDistance.y,
              left: ghostMovingDistance.x,
              height: itemHeight,
              paddingLeft: paddingLeft(fromItem.depth),
              opacity: 0.5,
            }}
            item={fromItem}
            paddingLeft={paddingLeft(fromItem.depth)}
            onCollapse={() => {}}
          />,
          document.body,
        )}
    </>
  );
};
