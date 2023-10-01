import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
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

const FIRST_HORIZONTAL_BOUNDARY = OFFSET + CONTENT_WIDTH;
const FIRST_VERTICAL_BOUNDARY = OFFSET + CONTENT_HEIGHT;

const SECOND_HORIZONTAL_BOUNDARY = CONTENT_WIDTH - TRIGGER_WIDTH;
const SECOND_VERTICAL_BOUNDARY = CONTENT_HEIGHT - TRIGGER_HEIGHT;

const CENTER_HORIZONTAL_BOUNDARY = CONTENT_WIDTH / 2 - TRIGGER_WIDTH / 2;
const CENTER_VERTICAL_BOUNDARY = CONTENT_HEIGHT / 2 - TRIGGER_HEIGHT / 2;

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
      // eslint-disable-next-line testing-library/no-node-access
      contentContainer={document.getElementById('storybook-root')!}
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
  padding-top: ${FIRST_VERTICAL_BOUNDARY + 1}px;
  padding-left: ${FIRST_HORIZONTAL_BOUNDARY + 1}px;
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
        backgroundColor: 'gray',
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
                top: FIRST_VERTICAL_BOUNDARY,
                right: SECOND_HORIZONTAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="top-left"
              style={{
                top: FIRST_VERTICAL_BOUNDARY - 1,
                right: SECOND_HORIZONTAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="top"
              style={{
                top: FIRST_VERTICAL_BOUNDARY,
                left: CENTER_HORIZONTAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="top"
              style={{
                top: FIRST_VERTICAL_BOUNDARY - 1,
                left: CENTER_HORIZONTAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="top"
              style={{
                top: FIRST_VERTICAL_BOUNDARY,
                right: CENTER_HORIZONTAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="top"
              style={{
                top: FIRST_VERTICAL_BOUNDARY - 1,
                right: CENTER_HORIZONTAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="top-right"
              style={{
                top: FIRST_VERTICAL_BOUNDARY,
                left: SECOND_HORIZONTAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="top-right"
              style={{
                top: FIRST_VERTICAL_BOUNDARY - 1,
                left: SECOND_HORIZONTAL_BOUNDARY - 1,
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="bottom-left"
              style={{
                bottom: FIRST_VERTICAL_BOUNDARY,
                right: SECOND_HORIZONTAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="bottom-left"
              style={{
                bottom: FIRST_VERTICAL_BOUNDARY - 1,
                right: SECOND_HORIZONTAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="bottom"
              style={{
                bottom: FIRST_VERTICAL_BOUNDARY,
                left: CENTER_HORIZONTAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="bottom"
              style={{
                bottom: FIRST_VERTICAL_BOUNDARY - 1,
                left: CENTER_HORIZONTAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="bottom"
              style={{
                bottom: FIRST_VERTICAL_BOUNDARY,
                right: CENTER_HORIZONTAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="bottom"
              style={{
                bottom: FIRST_VERTICAL_BOUNDARY - 1,
                right: CENTER_HORIZONTAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="bottom-right"
              style={{
                bottom: FIRST_VERTICAL_BOUNDARY,
                left: SECOND_HORIZONTAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="bottom-right"
              style={{
                bottom: FIRST_VERTICAL_BOUNDARY - 1,
                left: SECOND_HORIZONTAL_BOUNDARY - 1,
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="left-top"
              style={{
                left: FIRST_HORIZONTAL_BOUNDARY,
                bottom: SECOND_VERTICAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="left-top"
              style={{
                left: FIRST_HORIZONTAL_BOUNDARY - 1,
                bottom: SECOND_VERTICAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="left"
              style={{
                left: FIRST_HORIZONTAL_BOUNDARY,
                top: CENTER_VERTICAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="left"
              style={{
                left: FIRST_HORIZONTAL_BOUNDARY - 1,
                top: CENTER_VERTICAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="left"
              style={{
                left: FIRST_HORIZONTAL_BOUNDARY,
                bottom: CENTER_VERTICAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="left"
              style={{
                left: FIRST_HORIZONTAL_BOUNDARY - 1,
                bottom: CENTER_VERTICAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="left-bottom"
              style={{
                left: FIRST_HORIZONTAL_BOUNDARY,
                top: SECOND_VERTICAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="left-bottom"
              style={{
                left: FIRST_HORIZONTAL_BOUNDARY - 1,
                top: SECOND_VERTICAL_BOUNDARY - 1,
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="right-top"
              style={{
                right: FIRST_HORIZONTAL_BOUNDARY,
                bottom: SECOND_VERTICAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="right-top"
              style={{
                right: FIRST_HORIZONTAL_BOUNDARY - 1,
                bottom: SECOND_VERTICAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="right"
              style={{
                right: FIRST_HORIZONTAL_BOUNDARY,
                top: CENTER_VERTICAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="right"
              style={{
                right: FIRST_HORIZONTAL_BOUNDARY - 1,
                top: CENTER_VERTICAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="right"
              style={{
                right: FIRST_HORIZONTAL_BOUNDARY,
                bottom: CENTER_VERTICAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="right"
              style={{
                right: FIRST_HORIZONTAL_BOUNDARY - 1,
                bottom: CENTER_VERTICAL_BOUNDARY - 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <PopoverInFrame
              positionType="right-bottom"
              style={{
                right: FIRST_HORIZONTAL_BOUNDARY,
                top: SECOND_VERTICAL_BOUNDARY,
              }}
            />
            <PopoverInFrame
              positionType="right-bottom"
              style={{
                right: FIRST_HORIZONTAL_BOUNDARY - 1,
                top: SECOND_VERTICAL_BOUNDARY - 1,
              }}
            />
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const test = async (
      positionType: PositionType,
      index: number,
      cb: (triggerRect: DOMRect, contentRect: DOMRect) => void,
    ) => {
      const trigger = canvas.getAllByText(positionType)[index]!;
      const triggerRect = trigger.getBoundingClientRect();
      userEvent.click(trigger);

      await waitFor(() => {
        const content = canvas.getByTestId('popover-content');
        const contentRect = content.getBoundingClientRect();

        cb(triggerRect, contentRect);
      });
    };

    await test('top-left', 0, (triggerRect, contentRect) => {
      expect(contentRect.bottom).toBe(triggerRect.top - OFFSET);
      expect(contentRect.left).toBe(triggerRect.left);
    });
    await test('top-left', 1, (triggerRect, contentRect) => {
      expect(contentRect.top).toBe(triggerRect.bottom + OFFSET);
      expect(contentRect.right).toBe(triggerRect.right);
    });

    await test('top', 0, (triggerRect, contentRect) => {
      expect(contentRect.bottom).toBe(triggerRect.top - OFFSET);
      expect(contentRect.left).toBe(
        triggerRect.left - CENTER_HORIZONTAL_BOUNDARY,
      );
    });
    await test('top', 1, (triggerRect, contentRect) => {
      expect(contentRect.top).toBe(triggerRect.bottom + OFFSET);
      expect(contentRect.left).toBe(triggerRect.left);
    });
    await test('top', 2, (triggerRect, contentRect) => {
      expect(contentRect.bottom).toBe(triggerRect.top - OFFSET);
      expect(contentRect.right).toBe(
        triggerRect.right + CENTER_HORIZONTAL_BOUNDARY,
      );
    });
    await test('top', 3, (triggerRect, contentRect) => {
      expect(contentRect.top).toBe(triggerRect.bottom + OFFSET);
      expect(contentRect.right).toBe(triggerRect.right);
    });

    await test('top-right', 0, (triggerRect, contentRect) => {
      expect(contentRect.bottom).toBe(triggerRect.top - OFFSET);
      expect(contentRect.right).toBe(triggerRect.right);
    });
    await test('top-right', 1, (triggerRect, contentRect) => {
      expect(contentRect.top).toBe(triggerRect.bottom + OFFSET);
      expect(contentRect.left).toBe(triggerRect.left);
    });
  },
};
