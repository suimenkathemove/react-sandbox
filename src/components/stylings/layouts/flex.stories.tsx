import { Meta } from '@storybook/react';
import styled from 'styled-components';

import { Component } from '@/components/component';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  /* flex-wrap: wrap; を指定しないと効かない */
  align-content: center;
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

export default {
  component: AlignContentCenter,
} as Meta;
