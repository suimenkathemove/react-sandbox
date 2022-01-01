import { FlattenedTreeItem } from '../../types';
import { Handle, HandleProps } from '../handle';

import { DraggableNode, DroppableNode, Id } from './styles';

export type SortableTreeItemProps = Pick<FlattenedTreeItem, 'id' | 'depth'> & {
  setDroppableNodeRef?: (element: HTMLElement | null) => void;
  setDraggableNodeRef?: (element: HTMLElement | null) => void;
  style?: React.CSSProperties;
  handleProps?: HandleProps;
  clone?: boolean;
  ghost?: boolean;
};

export const SortableTreeItem: React.VFC<SortableTreeItemProps> = (props) => {
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
      </DraggableNode>
    </DroppableNode>
  );
};
