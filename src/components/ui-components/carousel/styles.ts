import styled from 'styled-components';

export const Container = styled.div<{ width: string }>`
  width: ${(props) => props.width};
`;

export const ItemContainer = styled.ul`
  display: flex;
  overflow-x: hidden;
`;

export const Item = styled.li<{ currentPage: number }>`
  flex-shrink: 0;
  width: 100%;
  transition: transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
  transform: translateX(${(props) => `${-100 * props.currentPage}%`});
`;

export const PageControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
