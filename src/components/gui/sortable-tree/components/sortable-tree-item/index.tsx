import { useCallback } from 'react';

import { FlattenedTreeItem } from '../../types';
import { Handle, HandleProps } from '../handle';
import { XButton } from '../x-button';

import { DraggableNode, DroppableNode, Id, XButtonWrapper } from './styles';

export type SortableTreeItemProps = Pick<FlattenedTreeItem, 'id' | 'depth'> & {
  setDroppableNodeRef?: (element: HTMLElement | null) => void;
  setDraggableNodeRef?: (element: HTMLElement | null) => void;
  style?: React.CSSProperties;
  handleProps?: HandleProps;
  clone?: boolean;
  ghost?: boolean;
  onRemove: (id: FlattenedTreeItem['id']) => void;
};

export const SortableTreeItem: React.VFC<SortableTreeItemProps> = (props) => {
  const onClickXButton = useCallback(() => {
    props.onRemove(props.id);
  }, [props]);

  return (
    <DroppableNode
      ref={props.setDroppableNodeRef}
      depth={props.depth}
      clone={props.clone}
      ghost={props.ghost}
    >
      <DraggableNode
        ref={props.setDraggableNodeRef}
        style={props.style}
        clone={props.clone}
      >
        <Handle {...props.handleProps} />
        <Id>{props.id}</Id>
        {!props.clone && (
          <XButtonWrapper>
            <XButton onClick={onClickXButton} />
          </XButtonWrapper>
        )}
      </DraggableNode>
    </DroppableNode>
  );
};
