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
  index: number;
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
  const flattenedTree = useMemo(() => flattenTree(tree), [tree]);
  const collapsedFlattenedTree = useMemo(
    () => collapseFlattenTree(tree),
    [tree],
  );

  const [fromIndex, setFromIndex] = useState<number | null>(null);

  const [borderOrBackground, setBorderOrBackground] =
    useState<BorderOrBackground | null>(null);

  const containerElementRef = useRef<ContainerElement>(null);
  const itemElementRefMap = useRef<Map<NodeId, React.RefObject<ItemElement>>>(
    new Map(),
  );
  // TODO: useIsomorphicLayoutEffect
  useLayoutEffect(() => {
    flattenedTree.forEach((item) => {
      itemElementRefMap.current.set(item.id, createRef());
    });
  }, [flattenedTree]);

  const pointerStartPositionRef = useRef<Coordinate | null>(null);
  const [pointerMovingDistance, setPointerMovingDistance] =
    useState<Coordinate | null>(null);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<ItemElement>, index: number) => {
      setFromIndex(index);

      pointerStartPositionRef.current = { x: event.clientX, y: event.clientY };
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (
        fromIndex == null ||
        containerElementRef.current == null ||
        pointerStartPositionRef.current == null
      )
        return;

      const movingDistance =
        event.clientY - containerElementRef.current.getBoundingClientRect().top;
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

      setPointerMovingDistance({
        x: event.clientX - pointerStartPositionRef.current.x,
        y: event.clientY - pointerStartPositionRef.current.y,
      });
    },
    [flattenedTree.length, fromIndex, heightDisplayBorder, itemHeight],
  );

  const onPointerUp = useCallback(() => {
    setFromIndex(null);
    setBorderOrBackground(null);

    pointerStartPositionRef.current = null;
    setPointerMovingDistance(null);

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
        return itemHeight * flattenedTree.length - borderOffset;
      default:
        return borderOrBackground satisfies never;
    }
  }, [borderOffset, borderOrBackground, flattenedTree.length, itemHeight]);

  const ghostMovingDistance = useMemo((): Coordinate | null => {
    if (fromIndex == null || pointerMovingDistance == null) return null;
    const fromItem = flattenedTree[fromIndex];
    invariant(fromItem != null, 'fromItem should exist');
    const fromElement = itemElementRefMap.current.get(fromItem.id)?.current;
    invariant(fromElement != null, 'fromElement should exist');
    const fromRect = fromElement.getBoundingClientRect();

    return {
      x: fromRect.x + pointerMovingDistance.x,
      y: fromRect.y + pointerMovingDistance.y,
    };
  }, [flattenedTree, fromIndex, pointerMovingDistance]);

  const onCollapse = useCallback(
    (id: NodeId) => {
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
    [flattenedTree],
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
              onPointerDown(event, index);
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
              cursor: fromIndex != null ? 'grabbing' : undefined,
              backgroundColor: borderColor,
            }}
          />
        )}
      </props.Container>
      {fromIndex != null &&
        ghostMovingDistance != null &&
        createPortal(
          <props.Item
            onPointerDown={() => {}}
            style={{
              position: 'absolute',
              top: ghostMovingDistance.y,
              left: ghostMovingDistance.x,
              height: itemHeight,
              paddingLeft: paddingLeft(flattenedTree[fromIndex]!.depth),
              opacity: 0.5,
            }}
            item={flattenedTree[fromIndex]!}
            index={fromIndex}
            paddingLeft={paddingLeft(flattenedTree[fromIndex]!.depth)}
            onCollapse={() => {}}
          />,
          document.body,
        )}
    </>
  );
};
