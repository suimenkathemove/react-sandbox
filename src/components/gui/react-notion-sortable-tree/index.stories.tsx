import { StoryObj } from '@storybook/react';
import { forwardRef, useState } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';

import { ContainerProps, ItemProps, ReactNotionSortableTree } from '.';

import { tree as mockTree } from '@/components/gui/sortable-tree/__mocks__/tree';

export default {};

const Wrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {props.children}
    </div>
  );
};

export const Default: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tree, setTree] = useState(mockTree);

    return (
      <Wrapper>
        <ReactNotionSortableTree
          tree={tree}
          setTree={setTree}
          Container={forwardRef<
            HTMLUListElement,
            ContainerProps<HTMLUListElement>
          >((props, ref) => (
            <ul
              style={{
                ...props.style,
                width: 240,
              }}
              ref={ref}
            >
              {props.children}
            </ul>
          ))}
          Item={forwardRef<HTMLLIElement, ItemProps<HTMLLIElement>>(
            (props, ref) => (
              <li
                onPointerDown={props.onPointerDown}
                style={props.style}
                ref={ref}
              >
                <button
                  onClick={() => {
                    props.onCollapse();
                  }}
                >
                  {props.item.collapsed ? '>' : 'v'}
                </button>
                {props.item.id}
              </li>
            ),
          )}
        />
      </Wrapper>
    );
  },
};

export const Notion: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tree, setTree] = useState(mockTree);

    return (
      <Wrapper>
        <ReactNotionSortableTree
          tree={tree}
          setTree={setTree}
          Container={forwardRef<
            HTMLUListElement,
            ContainerProps<HTMLUListElement>
          >((props, ref) => (
            <ul
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
          Item={forwardRef<HTMLLIElement, ItemProps<HTMLLIElement>>(
            (props, ref) => (
              <li
                onPointerDown={props.onPointerDown}
                style={{
                  ...props.style,
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 8 + props.paddingLeft,
                  paddingRight: 8,
                  fontFamily: 'BlinkMacSystemFont, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'rgba(25, 23, 17, 0.6)',
                }}
                ref={ref}
              >
                <button
                  onClick={() => {
                    props.onCollapse();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    marginRight: 4,
                  }}
                >
                  {props.item.collapsed ? (
                    <ChevronRight size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {props.item.id}
              </li>
            ),
          )}
          itemHeight={28}
          paddingPerDepth={24}
          backgroundColor="rgba(35, 131, 226, 0.14)"
          borderHeight={4}
          borderColor="rgba(35, 131, 226, 0.43)"
        />
      </Wrapper>
    );
  },
};
