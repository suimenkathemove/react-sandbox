import { StoryObj } from '@storybook/react';
import { forwardRef } from 'react';

import { ContentProps, ReactSelectRectangle } from '.';

import { range } from '@/utils/range';

export default {};

export const Default: StoryObj = {
  render: () => {
    return (
      <ReactSelectRectangle
        Container={(props) => (
          <div
            onPointerDown={props.onPointerDown}
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {props.children}
          </div>
        )}
        Content={forwardRef<HTMLDivElement, ContentProps<HTMLDivElement>>(
          (props, ref) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                margin: 4,
                backgroundColor: props.selected ? '#4af' : '#eee',
                borderRadius: 4,
                userSelect: 'none',
              }}
              ref={ref}
            >
              {props.id}
            </div>
          ),
        )}
        contents={range(100).map((i) => ({ id: i.toString() }))}
        onSelect={(ids) => {
          // eslint-disable-next-line no-console
          console.log(ids);
        }}
        selectionStyle={{
          backgroundColor: 'rgba(68, 170, 255, 0.5)',
          border: '1px solid #4af',
        }}
      />
    );
  },
};
