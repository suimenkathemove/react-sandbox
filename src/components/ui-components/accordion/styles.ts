import styled from 'styled-components';

export const Container = styled.div<{ isOpen: boolean; height: number }>`
  height: ${(props) => (props.isOpen ? `${props.height}px` : 0)};
  overflow: hidden;
  transition: height 200ms ease;
`;
