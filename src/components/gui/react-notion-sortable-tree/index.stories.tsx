import { StoryObj } from '@storybook/react';
import { forwardRef } from 'react';

import { ContainerProps, ReactNotionSortableTree } from '.';

import { tree } from '@/components/gui/sortable-tree/__mocks__/tree';

export default {};

export const Default: StoryObj = {
  render: () => {
    return (
      <ReactNotionSortableTree
        tree={tree}
        Container={forwardRef<
          HTMLUListElement,
          ContainerProps<HTMLUListElement>
        >((props, ref) => (
          <ul
            onPointerMove={props.onPointerMove}
            onPointerUp={props.onPointerUp}
            style={props.style}
            ref={ref}
          >
            {props.children}
          </ul>
        ))}
        Item={(props) => (
          <li onPointerDown={props.onPointerDown} style={props.style}>
            {props.item.id}
          </li>
        )}
      />
    );
  },
};

export const Notion: StoryObj = {
  render: () => {
    return (
      <ReactNotionSortableTree
        tree={tree}
        Container={forwardRef<
          HTMLUListElement,
          ContainerProps<HTMLUListElement>
        >((props, ref) => (
          <ul
            onPointerMove={props.onPointerMove}
            onPointerUp={props.onPointerUp}
            style={{
              ...props.style,
              width: 240,
              backgroundColor: 'rgb(251 251 250)',
            }}
            ref={ref}
          >
            {props.children}
          </ul>
        ))}
        Item={(props) => (
          <li
            onPointerDown={props.onPointerDown}
            style={{
              ...props.style,
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 8 + props.paddingLeft,
              paddingRight: 8,
              fontFamily: 'BlinkMacSystemFont, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              color: 'rgba(25, 23, 17, 0.6)',
            }}
          >
            {props.item.id}
          </li>
        )}
        itemHeight={28}
        paddingPerDepth={24}
        backgroundColor="rgba(35, 131, 226, 0.14)"
        border="4px solid rgba(35, 131, 226, 0.43)"
      />
    );
  },
};
