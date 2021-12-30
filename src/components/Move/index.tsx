import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

type ElementPosition = {
  top: number;
  left: number;
};

type Coordinate = {
  x: number;
  y: number;
};

export const Move: React.VFC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const elementInitialPosition = useRef<ElementPosition | null>(null);
  const elementStartPosition = useRef<ElementPosition | null>(null);
  const pointerStartPosition = useRef<Coordinate | null>(null);
  const [elementDistance, setElementGoalPosition] = useState<Coordinate | null>(
    null,
  );

  const elementCurrentPosition = (): ElementPosition => {
    const { top, left } = elementRef.current!.getBoundingClientRect();

    return { top, left };
  };

  const moveByDistance = (distance: Coordinate) => {
    if (elementStartPosition.current == null) {
      return;
    }

    const startXBeforeMove =
      elementStartPosition.current.left - elementInitialPosition.current!.left;
    const startYBeforeMove =
      elementStartPosition.current.top - elementInitialPosition.current!.top;

    setElementGoalPosition({
      x: startXBeforeMove + distance.x,
      y: startYBeforeMove + distance.y,
    });
  };

  const resetStartPosition = () => {
    elementStartPosition.current = null;

    pointerStartPosition.current = null;
  };

  useEffect(() => {
    elementInitialPosition.current = elementCurrentPosition();
  }, []);

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    elementStartPosition.current = elementCurrentPosition();

    pointerStartPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };
  const onTouchDown: React.TouchEventHandler<HTMLDivElement> = (event) => {
    elementStartPosition.current = elementCurrentPosition();

    pointerStartPosition.current = {
      x: event.touches[0]!.clientX,
      y: event.touches[0]!.clientY,
    };
  };

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (pointerStartPosition.current == null) {
        return;
      }

      const pointerMovedDistanceX =
        event.clientX - pointerStartPosition.current.x;
      const pointerMovedDistanceY =
        event.clientY - pointerStartPosition.current.y;

      moveByDistance({ x: pointerMovedDistanceX, y: pointerMovedDistanceY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  useEffect(() => {
    const onTouchMove = (event: TouchEvent) => {
      if (pointerStartPosition.current == null) {
        return;
      }

      const pointerMovedDistanceX =
        event.touches[0]!.clientX - pointerStartPosition.current.x;
      const pointerMovedDistanceY =
        event.touches[0]!.clientY - pointerStartPosition.current.y;

      moveByDistance({ x: pointerMovedDistanceX, y: pointerMovedDistanceY });
    };

    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
    resetStartPosition();
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    resetStartPosition();
  };

  return (
    <div
      ref={elementRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      // TODO
      role="button"
      tabIndex={-1}
      className={styles.base}
      style={{
        transform:
          elementDistance != null
            ? `translate(${elementDistance.x}px, ${elementDistance.y}px)`
            : void 0,
      }}
    />
  );
};
