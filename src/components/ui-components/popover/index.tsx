import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Offset, Position } from './models';
import { PositionType } from './models/position-type';
import { ContentWrapper, TriggerWrapper } from './styles';
import { resolvePosition } from './utils/resolve-position';

import { useBool } from '@/hooks/use-bool';

export interface PopoverProps {
  children: React.ReactNode; // trigger
  content: React.ReactNode;
  positionType: PositionType;
  offset?: Offset;
  frameElement?: HTMLElement | null;
  mountTarget?: HTMLElement;
  isMountTargetPositionRelative?: boolean;
}

export const Popover: React.FC<PopoverProps> = (props) => {
  const [open, onOpen, offOpen] = useBool();

  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current?.getBoundingClientRect();
    const content = contentRef.current?.getBoundingClientRect();
    if (trigger != null && content != null) {
      const newPosition = resolvePosition(
        trigger,
        content,
        props.positionType,
        props.offset ?? null,
        props.mountTarget?.getBoundingClientRect() ?? null,
        props.isMountTargetPositionRelative ?? false,
        props.frameElement?.getBoundingClientRect() ?? null,
      );
      setPosition(newPosition);
    }
  }, [
    open,
    props.frameElement,
    props.isMountTargetPositionRelative,
    props.mountTarget,
    props.offset,
    props.positionType,
  ]);

  useEffect(() => {
    const options: AddEventListenerOptions = { capture: true };

    window.addEventListener('click', offOpen, options);

    return () => {
      window.removeEventListener('click', offOpen, options);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TriggerWrapper onClick={onOpen} ref={triggerRef}>
        {props.children}
      </TriggerWrapper>
      {open &&
        createPortal(
          <ContentWrapper style={position} ref={contentRef}>
            {props.content}
          </ContentWrapper>,
          props.mountTarget ?? document.body,
        )}
    </>
  );
};
