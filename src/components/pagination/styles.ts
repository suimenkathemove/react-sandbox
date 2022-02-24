import styled from 'styled-components';

export const Container = styled.div`
  display: inline-flex;

  button + button {
    margin-left: 8px;
  }
`;

export const Button = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: ${(props) => (props.active ? 'red' : 'white')};
  border: 1px solid black;
  border-radius: 50%;

  &:hover:enabled {
    background-color: blue;
  }
`;

export const Text = styled.span`
  font-size: 12px;
  line-height: 14px;
`;
