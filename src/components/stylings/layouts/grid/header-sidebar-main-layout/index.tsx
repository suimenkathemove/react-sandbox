import { FC } from 'react';

import { Container, Header, Main, Sidebar } from './styles';

export const HeaderSidebarMainLayout: FC = () => {
  return (
    <Container>
      <Header />
      <Sidebar />
      <Main />
    </Container>
  );
};
