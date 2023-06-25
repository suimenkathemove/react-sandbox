import styled from 'styled-components';

const BORDER_WIDTH = 1;

export const Container = styled.div`
  position: relative;
  display: inline-block;
  background-color: white;
  border: ${BORDER_WIDTH}px solid black;
`;

const BALLOON_TAIL_SIZE = 8;

export const BalloonTail = styled.div`
  position: absolute;
  top: calc(100% + ${BORDER_WIDTH}px);
  left: 50%;
  width: ${BALLOON_TAIL_SIZE}px;
  height: ${BALLOON_TAIL_SIZE}px;
  background-color: white;
  border-right: ${BORDER_WIDTH}px solid black;
  border-bottom: ${BORDER_WIDTH}px solid black;
  transform: translate(-50%, -50%) rotate(45deg) skew(15deg, 15deg);
`;
