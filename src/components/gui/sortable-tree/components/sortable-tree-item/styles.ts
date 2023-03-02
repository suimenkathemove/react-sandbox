import styled from 'styled-components';

import { indentationWidth } from '../../constants';

export const DroppableNode = styled.li<{
  depth: number;
  clone?: boolean;
  ghost?: boolean;
}>`
  display: ${(props) => props.clone && 'inline-block'};
  /* stylelint-disable-next-line declaration-colon-newline-after */
  padding: ${(props) =>
    props.clone ? '4px' : `0 0 0 ${indentationWidth * props.depth}px`};
  pointer-events: ${(props) => props.clone && 'none'};
  opacity: ${(props) => props.ghost && 0.5};
`;

export const DraggableNode = styled.div<{ clone?: boolean }>`
  display: flex;
  align-items: center;
  max-width: 460px;
  height: ${(props) => (props.clone ? 32 : 40)}px;
  padding: 0 0.5rem;
  background-color: #ffffff;
  border: solid 1px #e0e0e0;
  border-radius: 4px;
  /* stylelint-disable-next-line declaration-colon-newline-after */
  box-shadow: ${(props) =>
    props.clone && '0 15px 15px 0 rgba(34, 33, 81, 0.1)'};
`;

export const Id = styled.span`
  margin-left: 0.5rem;
  font-family: 'Hiragino Kaku Gothic Pro', sans-serif;
  font-size: 0.75rem;
  font-weight: bold;
  color: #424242;
  letter-spacing: 0.1px;
`;

export const XButtonWrapper = styled.div`
  margin-left: auto;
`;
