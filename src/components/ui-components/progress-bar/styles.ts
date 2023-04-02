import styled from 'styled-components';

export const Progress = styled.progress`
  width: 100%;
  height: 8px;
  appearance: none;

  ::-webkit-progress-bar {
    background-color: gray;
    border-radius: 4px;
  }

  ::-webkit-progress-value {
    background-color: red;
    border-radius: 4px;
  }
`;
