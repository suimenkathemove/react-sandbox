import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Offset, Position } from './models';
import { PositionType } from './models/position-type';
import { resolvePosition } from './utils/resolve-position';

import { useBool } from '@/hooks/use-bool';

export interface TriggerProps {
  onClick: () => void;
}

export interface ContentProps {
  style: React.CSSProperties;
}

export interface PopoverProps<
  TriggerElement extends HTMLElement,
  ContentElement extends HTMLElement,
> {
  Trigger: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<TriggerProps> & React.RefAttributes<TriggerElement>
  >;
  Content: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ContentProps> & React.RefAttributes<ContentElement>
  >;
  positionType: PositionType;
  offset?: Offset;
  frameElement?: HTMLElement | null;
  mountTarget?: HTMLElement;
  isMountTargetPositionRelative?: boolean;
}

export const Popover = <
  TriggerElement extends HTMLElement,
  ContentElement extends HTMLElement,
>(
  props: PopoverProps<TriggerElement, ContentElement>,
) => {
  const [open, onOpen, offOpen] = useBool();

  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const triggerRef = useRef<TriggerElement>(null);
  const contentRef = useRef<ContentElement>(null);

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
    const onClickOutsideContent = (event: MouseEvent) => {
      if (
        open &&
        event.target !== triggerRef.current &&
        !contentRef.current?.contains(event.target as Node)
      ) {
        offOpen();
      }
    };

    window.addEventListener('click', onClickOutsideContent);

    return () => {
      window.removeEventListener('click', onClickOutsideContent);
    };
  }, [offOpen, open]);

  return (
    <>
      <props.Trigger onClick={onOpen} ref={triggerRef} />
      {open &&
        createPortal(
          <props.Content
            style={{ position: 'absolute', ...position }}
            ref={contentRef}
          />,
          props.mountTarget ?? document.body,
        )}
    </>
  );
};
