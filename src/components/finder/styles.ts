import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100%;
`;

export const RootsPanel = styled.div`
  width: 180px;
`;

export const Root = styled.li<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${(props) => props.active && 'yellow'};

  &:hover {
    background-color: yellow;
  }
`;

export const DescendantsPanel = styled.div`
  border-left: 1px solid black;
`;

export const Descendant = styled.li<{ depth: number }>`
  display: flex;
  align-items: center;
  padding: 8px 24px;
  padding-left: ${(props) => `calc(24px + ${16 * props.depth}px)`};
  cursor: pointer;

  &:hover {
    background-color: yellow;
  }
`;
