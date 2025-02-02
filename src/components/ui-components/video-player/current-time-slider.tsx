import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

import { invariant } from '@/utils/invariant';

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background-color: white;
  cursor: pointer;
`;

const Fill = styled.div<{ value: number }>`
  width: ${(props) => props.value}%;
  height: 100%;
  background-color: red;
`;

const Thumb = styled.div<{ value: number }>`
  position: absolute;
  top: 50%;
  left: ${(props) => props.value}%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-color: red;
  border-radius: 50%;
`;

export const CurrentTimeSlider: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [value, setValue] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const calculateValue = useCallback((clientX: number): number => {
    invariant(trackRef.current, 'trackRef.current is null');
    const trackRect = trackRef.current.getBoundingClientRect();
    const deltaX = clientX - trackRect.x;
    const value = (deltaX / trackRect.width) * 100;

    if (value < 0) return 0;
    if (value > 100) return 100;

    return value;
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);

    const newValue = calculateValue(e.clientX);
    setValue(newValue);
  };

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging) return;

      const newValue = calculateValue(e.clientX);
      setValue(newValue);
    },
    [calculateValue, isDragging],
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isDragging, onPointerMove, onPointerUp]);

  return (
    <Track ref={trackRef} onPointerDown={onPointerDown}>
      <Fill value={value} />
      <Thumb value={value} />
    </Track>
  );
};
