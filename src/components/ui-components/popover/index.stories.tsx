import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { PositionType, PositionTypeUnit } from './models/position-type';
import { OFFSET } from './utils/calc-position';

import { Popover, PopoverProps } from '.';

export default {
  component: Popover,
} as Meta<PopoverProps>;

const TRIGGER_WIDTH = 64;
const TRIGGER_HEIGHT = 16;

const CONTENT_WIDTH = 100;
const CONTENT_HEIGHT = 40;

const SAFE_FIRST_HORIZONTAL = OFFSET + CONTENT_WIDTH - 1;
const SAFE_FIRST_VERTICAL = OFFSET + CONTENT_HEIGHT - 1;

const SAFE_SECOND_HORIZONTAL = CONTENT_WIDTH - TRIGGER_WIDTH - 1;
const SAFE_SECOND_VERTICAL = CONTENT_HEIGHT - TRIGGER_HEIGHT - 1;

const SAFE_CENTER_HORIZONTAL = CONTENT_WIDTH / 2 - TRIGGER_WIDTH / 2 - 1;
const SAFE_CENTER_VERTICAL = CONTENT_HEIGHT / 2 - TRIGGER_HEIGHT / 2 - 1;

const PopoverByPositionType: React.FC<
  Pick<PopoverProps, 'positionType' | 'frameElement'>
> = (props) => {
  return (
    <Popover
      content={
        <div
          style={{
            width: CONTENT_WIDTH,
            height: CONTENT_HEIGHT,
            border: '1px solid black',
          }}
        />
      }
      positionType={props.positionType}
      frameElement={props.frameElement}
    >
      <div
        style={{
          width: TRIGGER_WIDTH,
          height: TRIGGER_HEIGHT,
          border: '1px solid black',
          fontSize: 10,
        }}
      >
        {props.positionType}
      </div>
    </Popover>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas: '. top .' 'left . right' '. bottom .';
  width: fit-content;
  padding-top: ${SAFE_FIRST_VERTICAL + 1}px;
  padding-left: ${SAFE_FIRST_HORIZONTAL + 1}px;
`;

const Wrapper = styled.div<{ gridArea: PositionTypeUnit }>`
  grid-area: ${(props) => props.gridArea};
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const Default: StoryObj = {
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

interface PopoverInFrameProps {
  positionType: PositionType;
  style: React.CSSProperties;
}

const PopoverInFrame: React.FC<PopoverInFrameProps> = (props) => {
  const frameRef = useRef<HTMLDivElement>(null);

  const [frameElement, setFrameElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setFrameElement(frameRef.current);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: TRIGGER_WIDTH + (OFFSET + CONTENT_WIDTH) * 2,
        height: TRIGGER_HEIGHT + (OFFSET + CONTENT_HEIGHT) * 2,
        border: '1px solid black',
      }}
      ref={frameRef}
    >
      <div style={{ position: 'absolute', ...props.style }}>
        <PopoverByPositionType
          positionType={props.positionType}
          frameElement={frameElement}
        />
      </div>
    </div>
  );
};

export const Flip: StoryObj = {
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          overflow: 'auto',
        }}
      >
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="top-left"
              style={{
                top: SAFE_FIRST_VERTICAL,
                right: SAFE_SECOND_HORIZONTAL,
              }}
            />
            <PopoverInFrame
              positionType="top-left"
              style={{
                top: SAFE_FIRST_VERTICAL - 1,
                right: SAFE_SECOND_HORIZONTAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="top"
              style={{
                top: SAFE_FIRST_VERTICAL,
                left: SAFE_CENTER_HORIZONTAL,
              }}
            />
            <PopoverInFrame
              positionType="top"
              style={{
                top: SAFE_FIRST_VERTICAL - 1,
                left: SAFE_CENTER_HORIZONTAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="top"
              style={{
                top: SAFE_FIRST_VERTICAL,
                right: SAFE_CENTER_HORIZONTAL,
              }}
            />
            <PopoverInFrame
              positionType="top"
              style={{
                top: SAFE_FIRST_VERTICAL - 1,
                right: SAFE_CENTER_HORIZONTAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="top-right"
              style={{
                top: SAFE_FIRST_VERTICAL,
                left: SAFE_SECOND_HORIZONTAL,
              }}
            />
            <PopoverInFrame
              positionType="top-right"
              style={{
                top: SAFE_FIRST_VERTICAL - 1,
                left: SAFE_SECOND_HORIZONTAL - 1,
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="bottom-left"
              style={{
                bottom: SAFE_FIRST_VERTICAL,
                right: SAFE_SECOND_HORIZONTAL,
              }}
            />
            <PopoverInFrame
              positionType="bottom-left"
              style={{
                bottom: SAFE_FIRST_VERTICAL - 1,
                right: SAFE_SECOND_HORIZONTAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="bottom"
              style={{
                bottom: SAFE_FIRST_VERTICAL,
                left: SAFE_CENTER_HORIZONTAL,
              }}
            />
            <PopoverInFrame
              positionType="bottom"
              style={{
                bottom: SAFE_FIRST_VERTICAL - 1,
                left: SAFE_CENTER_HORIZONTAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="bottom"
              style={{
                bottom: SAFE_FIRST_VERTICAL,
                right: SAFE_CENTER_HORIZONTAL,
              }}
            />
            <PopoverInFrame
              positionType="bottom"
              style={{
                bottom: SAFE_FIRST_VERTICAL - 1,
                right: SAFE_CENTER_HORIZONTAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="bottom-right"
              style={{
                bottom: SAFE_FIRST_VERTICAL,
                left: SAFE_SECOND_HORIZONTAL,
              }}
            />
            <PopoverInFrame
              positionType="bottom-right"
              style={{
                bottom: SAFE_FIRST_VERTICAL - 1,
                left: SAFE_SECOND_HORIZONTAL - 1,
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="left-top"
              style={{
                left: SAFE_FIRST_HORIZONTAL,
                bottom: SAFE_SECOND_VERTICAL,
              }}
            />
            <PopoverInFrame
              positionType="left-top"
              style={{
                left: SAFE_FIRST_HORIZONTAL - 1,
                bottom: SAFE_SECOND_VERTICAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="left"
              style={{
                left: SAFE_FIRST_HORIZONTAL,
                top: SAFE_CENTER_VERTICAL,
              }}
            />
            <PopoverInFrame
              positionType="left"
              style={{
                left: SAFE_FIRST_HORIZONTAL - 1,
                top: SAFE_CENTER_VERTICAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="left"
              style={{
                left: SAFE_FIRST_HORIZONTAL,
                bottom: SAFE_CENTER_VERTICAL,
              }}
            />
            <PopoverInFrame
              positionType="left"
              style={{
                left: SAFE_FIRST_HORIZONTAL - 1,
                bottom: SAFE_CENTER_VERTICAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="left-bottom"
              style={{
                left: SAFE_FIRST_HORIZONTAL,
                top: SAFE_SECOND_VERTICAL,
              }}
            />
            <PopoverInFrame
              positionType="left-bottom"
              style={{
                left: SAFE_FIRST_HORIZONTAL - 1,
                top: SAFE_SECOND_VERTICAL - 1,
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="right-top"
              style={{
                right: SAFE_FIRST_HORIZONTAL,
                bottom: SAFE_SECOND_VERTICAL,
              }}
            />
            <PopoverInFrame
              positionType="right-top"
              style={{
                right: SAFE_FIRST_HORIZONTAL - 1,
                bottom: SAFE_SECOND_VERTICAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="right"
              style={{
                right: SAFE_FIRST_HORIZONTAL,
                top: SAFE_CENTER_VERTICAL,
              }}
            />
            <PopoverInFrame
              positionType="right"
              style={{
                right: SAFE_FIRST_HORIZONTAL - 1,
                top: SAFE_CENTER_VERTICAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="right"
              style={{
                right: SAFE_FIRST_HORIZONTAL,
                bottom: SAFE_CENTER_VERTICAL,
              }}
            />
            <PopoverInFrame
              positionType="right"
              style={{
                right: SAFE_FIRST_HORIZONTAL - 1,
                bottom: SAFE_CENTER_VERTICAL - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="right-bottom"
              style={{
                right: SAFE_FIRST_HORIZONTAL,
                top: SAFE_SECOND_VERTICAL,
              }}
            />
            <PopoverInFrame
              positionType="right-bottom"
              style={{
                right: SAFE_FIRST_HORIZONTAL - 1,
                top: SAFE_SECOND_VERTICAL - 1,
              }}
            />
          </div>
        </div>
      </div>
    );
  },
};
