import { Meta } from '@storybook/react';
import styled from 'styled-components';

import { Component } from '@/components/component';

export default {} as Meta;

const Container = styled.div`
  display: flex;
  /* flex-wrap: wrap; を指定しないと効かない */
  align-content: center;
  flex-wrap: wrap;
  height: 200px;
`;
export const AlignContentCenter: React.FC = () => {
  return (
    <Container>
      <Component />
      <Component style={{ backgroundColor: 'blue' }} />
    </Container>
  );
};
