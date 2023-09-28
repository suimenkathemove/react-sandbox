import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import { PositionTypeUnit } from './models/position-type';

import { Popover, PopoverProps } from '.';

import { alphabets } from '@/utils/alphabets';

export default {
  component: Popover,
} as Meta<PopoverProps>;

const PopoverByPositionType: React.FC<Pick<PopoverProps, 'positionType'>> = (
  props,
) => {
  return (
    <Popover
      content={
        <div style={{ border: '1px solid black' }}>
          <div>{alphabets}</div>
          <div>{alphabets}</div>
        </div>
      }
      positionType={props.positionType}
    >
      <div style={{ width: 100, border: '1px solid black' }}>
        {props.positionType}
      </div>
    </Popover>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas: '. top .' 'left . right' '. bottom .';
  padding: 80px;
`;

const Wrapper = styled.div<{ gridArea: PositionTypeUnit }>`
  grid-area: ${(props) => props.gridArea};
  display: flex;
  gap: 4px;
`;

export const Default: StoryObj<PopoverProps> = {
  render: () => {
    return (
      <Container>
        <Wrapper gridArea="top">
          <PopoverByPositionType positionType="top-left" />
          <PopoverByPositionType positionType="top" />
          <PopoverByPositionType positionType="top-right" />
        </Wrapper>
        <Wrapper gridArea="left" style={{ flexDirection: 'column' }}>
          <PopoverByPositionType positionType="left-top" />
          <PopoverByPositionType positionType="left" />
          <PopoverByPositionType positionType="left-bottom" />
        </Wrapper>
        <Wrapper gridArea="right" style={{ flexDirection: 'column' }}>
          <PopoverByPositionType positionType="right-top" />
          <PopoverByPositionType positionType="right" />
          <PopoverByPositionType positionType="right-bottom" />
        </Wrapper>
        <Wrapper gridArea="bottom">
          <PopoverByPositionType positionType="bottom-left" />
          <PopoverByPositionType positionType="bottom" />
          <PopoverByPositionType positionType="bottom-right" />
        </Wrapper>
      </Container>
    );
  },
};
