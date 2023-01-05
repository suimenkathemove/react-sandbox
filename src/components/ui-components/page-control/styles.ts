import styled from 'styled-components';

export const Container = styled.div<{ gap: number }>`
  display: flex;
  gap: ${(props) => props.gap}px;
`;

export const Circle = styled.span<{ size: number; color: string }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;
