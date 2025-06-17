import styled from 'styled-components';

const header = 'header';
const sidebar = 'sidebar';
const main = 'main';

export const Container = styled.div`
  display: grid;
  grid-template-areas: '${header} ${header}' '${sidebar} ${main}';
  grid-template-rows: 50px 1fr;
  grid-template-columns: 400px 1fr;
  height: 100%;
`;

export const Header = styled.div`
  grid-area: ${header};
  background-color: red;
`;

export const Sidebar = styled.div`
  grid-area: ${sidebar};
  background-color: blue;
`;

export const Main = styled.div`
  grid-area: ${main};
  background-color: yellow;
`;
