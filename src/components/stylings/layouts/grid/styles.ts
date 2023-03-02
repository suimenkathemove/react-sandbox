import styled from 'styled-components';

const header = 'header';
const main = 'main';
const footer = 'footer';

export const Container = styled.div`
  display: grid;
  grid-template-areas: '${header}' '${main}' '${footer}';
  grid-template-rows: auto 1fr auto;
  height: 100%;
`;

export const Header = styled.header`
  grid-area: ${header};
  height: 100px;
  background-color: red;
`;

export const Main = styled.main`
  grid-area: ${main};
  background-color: blue;
`;

export const Footer = styled.footer`
  grid-area: ${footer};
  height: 100px;
  background-color: yellow;
`;
