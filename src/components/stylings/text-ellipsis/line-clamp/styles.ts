import styled from 'styled-components';

export const LineClamp = styled.div<{ lineClamp: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => props.lineClamp};
  overflow: hidden;
`;
