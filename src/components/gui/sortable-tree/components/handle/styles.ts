import styled from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 24px;
  cursor: grab;
  border-radius: 4px;

  svg {
    width: 0.5em;
    height: 0.5em;
    fill: #757575;
  }

  &:hover {
    /* stylelint-disable-next-line */
    background-color: rgba(0, 0, 0, 0.05);

    svg {
      fill: #6f7b88;
    }
  }

  &:active {
    background-color: inherit;

    svg {
      fill: inherit;
    }
  }
`;
