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

interface Coordinate {
  x: number;
  y: number;
}

interface Rect {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const checkPointIsInsideRect = (point: Coordinate, rect: Rect): boolean =>
  rect.left <= point.x &&
  point.x <= rect.right &&
  rect.top <= point.y &&
  point.y <= rect.bottom;

export interface ItemProps<T extends HTMLElement> {
  id: string;
  selected: boolean;
  ref: React.RefObject<T>;
}

export interface ReactSelectRectangleProps<T extends HTMLElement> {
  Container: React.FC<{
    onPointerDown: React.PointerEventHandler;
    children: React.ReactNode;
  }>;
  Item: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ItemProps<T>> & React.RefAttributes<T>
  >;
  items: { id: string }[];
  onSelect: (ids: string[]) => void;
  selectionStyle: React.CSSProperties;
}

export const ReactSelectRectangle = <T extends HTMLElement>(
  props: ReactSelectRectangleProps<T>,
) => {
  const [position, setPosition] = useState<Coordinate | null>(null);
  const [distance, setDistance] = useState<Coordinate | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectionRect = useMemo((): Rect | null => {
    if (position == null || distance == null) return null;

    const top = distance.y >= 0 ? position.y : position.y + distance.y;
    const bottom = top + Math.abs(distance.y);
    const left = distance.x >= 0 ? position.x : position.x + distance.x;
    const right = left + Math.abs(distance.x);

    return {
      top,
      bottom,
      left,
      right,
    };
  }, [distance, position]);

  const itemRefMap = useRef<Map<string, React.RefObject<T>>>(new Map());
  // TODO: useIsomorphicLayoutEffect
  useLayoutEffect(() => {
    props.items.forEach((c) => {
      itemRefMap.current.set(c.id, createRef());
    });
  }, [props.items]);

  const selected = useCallback(
    (id: string): boolean => {
      if (selectionRect == null) return false;
      const element = itemRefMap.current.get(id)?.current;
      if (element == null) return false;
      const elementRect = element.getBoundingClientRect();
      const baseX =
        elementRect.left <= selectionRect.left &&
        selectionRect.left <= elementRect.right
          ? selectionRect.left
          : elementRect.left;
      const baseY =
        elementRect.top <= selectionRect.top &&
        selectionRect.top <= elementRect.bottom
          ? selectionRect.top
          : elementRect.top;

      return checkPointIsInsideRect({ x: baseX, y: baseY }, selectionRect);
    },
    [selectionRect],
  );

  const onPointerDown: React.PointerEventHandler = useCallback((event) => {
    setSelectedIds([]);

    setPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (position == null) return;
      setDistance({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
    },
    [position],
  );

  const onPointerUp = useCallback(() => {
    const selectedIds = props.items
      .filter((c) => selected(c.id))
      .map((c) => c.id);
    props.onSelect(selectedIds);
    setSelectedIds(selectedIds);

    setPosition(null);
    setDistance(null);
  }, [props, selected]);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  return (
    <>
      <props.Container onPointerDown={onPointerDown}>
        {props.items.map((c) => (
          <props.Item
            key={c.id}
            id={c.id}
            selected={selected(c.id) || selectedIds.includes(c.id)}
            ref={itemRefMap.current.get(c.id)}
          />
        ))}
      </props.Container>
      {position != null &&
        distance != null &&
        selectionRect != null &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: selectionRect.top,
              left: selectionRect.left,
              width: Math.abs(distance.x),
              height: Math.abs(distance.y),
              ...props.selectionStyle,
            }}
          />,
          document.body,
        )}
    </>
  );
};
