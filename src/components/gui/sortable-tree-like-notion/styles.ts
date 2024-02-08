import styled from 'styled-components';

export const ITEM_HEIGHT = 28;
export const HEIGHT_DISPLAY_BORDER = ITEM_HEIGHT / 5;
const PADDING_PER_DEPTH = 24;

export const Ul = styled.ul<{ lastBorder: boolean }>`
  border-bottom: ${(props) => (props.lastBorder ? '1px solid blue' : 'none')};
`;

export const Li = styled.li<{
  depth: number;
  border: boolean;
  background: boolean;
}>`
  display: flex;
  align-items: center;
  height: ${ITEM_HEIGHT}px;
  padding-left: ${(props) => PADDING_PER_DEPTH * props.depth}px;
  user-select: none;
  background-color: ${(props) => (props.background ? 'blue' : 'none')};
  border-top: ${(props) => (props.border ? '1px solid blue' : 'none')};
`;
